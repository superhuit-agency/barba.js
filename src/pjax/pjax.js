import Utils from '../utils/utils';
import Dispatcher from '../dispatcher/dispatcher';
import HideShowTransition from '../transition/hideShowTransition';
import Cache from '../cache/static';

import HistoryManager from './historyManager';
import Dom from './dom';

/**
 * Pjax is a static object with main function
 *
 * @namespace Barba.Pjax
 * @borrows Dom as Dom
 * @type {Object}
 */
export default {
  Dom: Dom,
  History: HistoryManager,
  Cache: Cache,

  /**
   * Indicate wether or not use the cache
   *
   * @memberOf Barba.Pjax
   * @type {Boolean}
   * @default
   */
  cacheEnabled: true,

  /**
   * Indicate if there is an animation in progress
   *
   * @memberOf Barba.Pjax
   * @readOnly
   * @type {Boolean}
   */
  transitionProgress: false,

  /**
   * Class name used to ignore links
   *
   * @memberOf Barba.Pjax
   * @type {String}
   * @default
   */
  ignoreClassLink: 'no-barba',

  /**
   * Latest HTMLElement clicked
   *
   * @memberOf Barba.Pjax
   * @type {HTMLElement}
   */
  lastElementClicked: null,

  /**
   * Function to be called to start Pjax
   *
   * @memberOf Barba.Pjax
   */
  start() {
    this.init();
  },

  /**
   * Init the events
   *
   * @memberOf Barba.Pjax
   * @private
   */
  init() {
    const container = this.Dom.getContainer();
    const wrapper = this.Dom.getWrapper();

    wrapper.setAttribute('aria-live', 'polite');

    this.History.add(
      this.getCurrentUrl(),
      this.Dom.getNamespace(container)
    );

    //Fire for the current view.
    Dispatcher.trigger('initStateChange', this.History.currentStatus());
    Dispatcher.trigger('newPageReady',
      this.History.currentStatus(),
      {},
      container,
      this.Dom.currentHTML
    );

    Dispatcher.trigger('transitionCompleted', this.History.currentStatus());

    this.bindEvents();
  },

  /**
   * Attach the eventlisteners
   *
   * @memberOf Barba.Pjax
   * @private
   */
  bindEvents() {
    this.onLinkClick = this.onLinkClick.bind(this);
    this.onStateChange = this.onStateChange.bind(this);

    document.addEventListener('click', this.onLinkClick);
    window.addEventListener('popstate', this.onStateChange);
  },

  /**
   * Return the currentURL cleaned
   *
   * @memberOf Barba.Pjax
   * @return {String} currentUrl
   */
  getCurrentUrl() {
    // TODO, clean from what? currenturl do not takes hash..
    return Utils.cleanLink(
      Utils.getCurrentUrl()
    );
  },

  /**
   * Change the URL with pushstate and trigger the state change
   *
   * @memberOf Barba.Pjax
   * @param {String} newUrl
   */
  goTo(url) {
    window.history.pushState(null, null, url);
    this.onStateChange();
  },

  /**
   * Force the browser to go to a certain url
   *
   * @memberOf Barba.Pjax
   * @param {String} url
   * @private
   */
  forceGoTo(url) {
    window.location = url;
  },

  /**
   * Load an url, will start an ajax request or load from the cache
   *
   * @memberOf Barba.Pjax
   * @private
   * @param  {String} url
   * @return {Promise}
   */
  load(url) {
    const deferred = Utils.deferred();

    let request = this.Cache.get(url);

    if (!request) {
      request = Utils.request(url);
      this.Cache.set(url, request);
    }

    request.then(data => {
      const container = this.Dom.parseResponse(data);

      this.Dom.putContainer(container);

      if (!this.cacheEnabled)
        this.Cache.reset();

      deferred.resolve(container);
    })
    .catch(err => {
      this.forceGoTo(url);
      deferred.reject();
    });

    return deferred.promise;
  },

  /**
   * Get the .href parameter out of an element
   * and handle special cases (like xlink:href)
   *
   * @private
   * @memberOf Barba.Pjax
   * @param  {HTMLElement} el
   * @return {String} href
   */
  getHref(el) {
    if (!el) {
      return undefined;
    }

    if (el.getAttribute && typeof el.getAttribute('xlink:href') === 'string') {
      return el.getAttribute('xlink:href');
    }

    if (typeof el.href === 'string') {
      return el.href;
    }

    return undefined;
  },

  /**
   * Callback called from click event
   *
   * @memberOf Barba.Pjax
   * @private
   * @param {MouseEvent} evt
   */
  onLinkClick(evt) {
    let el = evt.target;

    //Go up in the nodelist until we
    //find something with an href
    while (el && !this.getHref(el)) {
      el = el.parentNode;
    }

    if (this.preventCheck(evt, el)) {
      evt.stopPropagation();
      evt.preventDefault();

      this.lastElementClicked = el;
      this.linkHash = el.hash.split('#')[1];

      Dispatcher.trigger('linkClicked', el, evt);

      const href = this.getHref(el);
      this.goTo(href);
    }
  },

  /**
   * Determine if the link should be followed
   *
   * @memberOf Barba.Pjax
   * @param  {MouseEvent} evt
   * @param  {HTMLElement} element
   * @return {Boolean}
   */
  preventCheck(evt, element) {
    if (!window.history.pushState)
      return false;

    const href = this.getHref(element);

    //User
    if (!element || !href)
      return false;

    //Middle click, cmd click, and ctrl click
    if (evt.which > 1 || evt.metaKey || evt.ctrlKey || evt.shiftKey || evt.altKey)
      return false;

    //Ignore target with _blank target
    if (element.target && element.target === '_blank')
      return false;

    //Check if it's the same domain
    if (window.location.protocol !== element.protocol || window.location.hostname !== element.hostname)
      return false;

    //Check if the port is the same
    if (Utils.getPort() !== Utils.getPort(element.port))
      return false;

    //Ignore case when a hash is being tacked on the current URL
    // if (href.indexOf('#') > -1)
    //   return false;

    //Ignore case where there is download attribute
    if (element.getAttribute && typeof element.getAttribute('download') === 'string')
      return false;

    //In case you're trying to load the same page
    if (Utils.cleanLink(href) == Utils.cleanLink(location.href))
      return false;

    if (element.classList.contains(this.ignoreClassLink))
      return false;

    return true;
  },

  /**
   * Return a transition object
   *
   * @memberOf Barba.Pjax
   * @param  {prev} prev historyManager
   * @param  {current} current historyManager
   * @return {Barba.Transition} Transition object
   */
  getTransition(prev, current) {
    //User customizable
    return HideShowTransition;
  },

  /**
   * Method called after a 'popstate' or from .goTo()
   *
   * @memberOf Barba.Pjax
   * @private
   */
  onStateChange() {
    const newUrl = this.getCurrentUrl();

    if (this.transitionProgress)
      this.forceGoTo(newUrl);

    if (this.History.currentStatus().url === newUrl)
      return false;

    this.History.add(newUrl);

    const newContainer = this.load(newUrl);
    const transitionObj = this.getTransition(
      this.History.prevStatus(),
      this.History.currentStatus()
    );

    const transition = new (transitionObj)();

    this.transitionProgress = true;

    Dispatcher.trigger('initStateChange',
      this.History.currentStatus(),
      this.History.prevStatus()
    );

    const transitionInstance = transition.init(
      this.Dom.getContainer(),
      newContainer
    );

    newContainer.then(
      this.onNewContainerLoaded.bind(this)
    );

    transitionInstance.then(
      this.onTransitionEnd.bind(this)
    );
  },

  /**
   * Function called as soon the new container is ready
   *
   * @memberOf Barba.Pjax
   * @private
   * @param {HTMLElement} container
   */
  onNewContainerLoaded(container) {
    const currentStatus = this.History.currentStatus();
    currentStatus.namespace = this.Dom.getNamespace(container);

    Dispatcher.trigger('newPageReady',
      this.History.currentStatus(),
      this.History.prevStatus(),
      container,
      this.Dom.currentHTML
    );
  },

  /**
   * Function called as soon the transition is finished
   *
   * @memberOf Barba.Pjax
   * @private
   */
  onTransitionEnd() {
    this.transitionProgress = false;

    if (this.linkHash) {
      window.location.hash = '';
      window.location.hash = this.linkHash;

      this.linkHash = null;
    }

    Dispatcher.trigger('transitionCompleted',
      this.History.currentStatus(),
      this.History.prevStatus()
    );
  }
};