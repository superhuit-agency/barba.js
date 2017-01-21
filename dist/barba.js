(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("Barba", [], factory);
	else if(typeof exports === 'object')
		exports["Barba"] = factory();
	else
		root["Barba"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 16);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Just an object with some helpful functions
 *
 * @type {Object}
 * @namespace Barba.Utils
 */
exports.default = {
  /**
   * Return the current url
   *
   * @memberOf Barba.Utils
   * @return {String} currentUrl
   */
  getCurrentUrl: function getCurrentUrl() {
    // Todo add hash
    return window.location.protocol + '//' + window.location.host + window.location.pathname + window.location.search;
  },


  /**
   * Given an url, return it without the hash
   *
   * @memberOf Barba.Utils
   * @private
   * @param  {String} url
   * @return {String} newCleanUrl
   */
  cleanLink: function cleanLink(url) {
    return url.replace(/#.*/, '');
  },


  /**
   * Time in millisecond after the ajax request goes in timeout
   *
   * @memberOf Barba.Utils
   * @type {Number}
   * @default
   */
  requestTimeout: 5000,

  /**
   * Start a fetch request
   *
   * @memberOf Barba.Utils
   * @param  {String} url
   * @return {Promise}
   */
  request: function request(url) {
    // TODO implement timeout!
    var dfd = this.deferred();

    var timeout = window.setTimeout(function () {
      dfd.reject(new Error('timeout!'));
    }, this.requestTimeout);

    var headers = new Headers();
    headers.append('x-barba', 'yes');

    fetch(url, {
      method: 'GET',
      headers: headers,
      cache: 'default'
    }).then(function (res) {
      window.clearTimeout(timeout);

      if (res.status >= 200 && res.status < 300) {
        return dfd.resolve(res.text());
      }

      var err = new Error(res.statusText || res.status);
      return dfd.reject(err);
    }).catch(function (err) {
      window.clearTimeout(timeout);
      dfd.reject(err);
    });

    return dfd.promise;
  },


  /**
   * Return a new "Deferred" object
   * https://developer.mozilla.org/en-US/docs/Mozilla/JavaScript_code_modules/Promise.jsm/Deferred
   *
   * @memberOf Barba.Utils
   * @return {Deferred}
   */
  deferred: function deferred() {
    return new function () {
      var _this = this;

      this.resolve = null;
      this.reject = null;

      this.promise = new Promise(function (resolve, reject) {
        _this.resolve = resolve;
        _this.reject = reject;
      });
    }();
  },


  /**
   * Return the port number normalized, eventually you can pass a string to be normalized.
   *
   * @memberOf Barba.Utils
   * @private
   * @param  {String} p
   * @return {Int} port
   */
  getPort: function getPort(p) {
    var port = typeof p !== 'undefined' ? p : window.location.port;
    var protocol = window.location.protocol;

    if (port != '') return parseInt(port);

    if (protocol === 'http:') return 80;

    if (protocol === 'https:') return 443;
  }
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Little Dispatcher inspired by MicroEvent.js
 *
 * @namespace Barba.Dispatcher
 * @type {Object}
 */
exports.default = {
  /**
   * Object that keeps all the events
   *
   * @memberOf Barba.Dispatcher
   * @readOnly
   * @type {Object}
   */
  events: {},

  /**
   * Bind a callback to an event
   *
   * @memberOf Barba.Dispatcher
   * @param  {String} eventName
   * @param  {Function} function
   */
  on: function on(e, f) {
    this.events[e] = this.events[e] || [];
    this.events[e].push(f);
  },


  /**
   * Bind a callback to an event that fires just once.
   *
   * @memberOf Barba.Dispatcher
   * @param  {String} eventName
   * @param  {Function} functio
   */
  once: function once(e, f) {
    var self = this;

    function newf() {
      self.off(e, newf);
      f.apply(this, arguments);
    };

    this.on(e, newf);
  },


  /**
   * Unbind event
   *
   * @memberOf Barba.Dispatcher
   * @param  {String} eventName
   * @param  {Function} function
   */
  off: function off(e, f) {
    if (e in this.events === false) return;

    this.events[e].splice(this.events[e].indexOf(f), 1);
  },


  /**
   * Fire the event running all the event associated to it
   *
   * @memberOf Barba.Dispatcher
   * @param  {String} eventName
   * @param  {...*} args
   */
  trigger: function trigger(e) {
    var _this = this;

    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    if (e in this.events === false) return;

    this.events[e].forEach(function (event) {
      event.apply(_this, args);
    });
  }
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Simple static cache
 *
 * @namespace Barba.Cache
 * @type {Object}
 */
exports.default = {
  /**
   * The Object that keeps all the key value information
   *
   * @memberOf Barba.Cache
   * @type {Object}
   */
  data: {},

  /**
   * Set a key and value data, mainly Barba is going to save promises
   *
   * @memberOf Barba.Cache
   * @param {String} key
   * @param {*} value
   */
  set: function set(key, val) {
    this.data[key] = val;
  },


  /**
   * Retrieve the data using the key
   *
   * @memberOf Barba.Cache
   * @param  {String} key
   * @return {*}
   */
  get: function get(key) {
    return this.data[key];
  },


  /**
   * Flush the cache
   *
   * @memberOf Barba.Cache
   */
  reset: function reset() {
    this.data = {};
  }
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * HistoryManager helps to keep track of the navigation
 *
 * @namespace Barba.HistoryManager
 * @type {Object}
 */
exports.default = {
  /**
   * Keep track of the status in historic order
   *
   * @memberOf Barba.HistoryManager
   * @readOnly
   * @type {Array}
   */
  history: [],

  /**
   * Add a new set of url and namespace
   *
   * @memberOf Barba.HistoryManager
   * @param {String} url
   * @param {String} namespace
   * @private
   */
  add: function add(url) {
    var namespace = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

    this.history.push({ url: url, namespace: namespace });
  },


  /**
   * Return information about the current status
   *
   * @memberOf Barba.HistoryManager
   * @return {Object}
   */
  currentStatus: function currentStatus() {
    return this.history[this.history.length - 1];
  },


  /**
   * Return information about the previous status
   *
   * @memberOf Barba.HistoryManager
   * @return {Object}
   */
  prevStatus: function prevStatus() {
    var history = this.history;

    if (history.length < 2) return null;

    return history[history.length - 2];
  }
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

var _dispatcher = __webpack_require__(1);

var _dispatcher2 = _interopRequireDefault(_dispatcher);

var _hideShowTransition = __webpack_require__(11);

var _hideShowTransition2 = _interopRequireDefault(_hideShowTransition);

var _static = __webpack_require__(2);

var _static2 = _interopRequireDefault(_static);

var _historyManager = __webpack_require__(3);

var _historyManager2 = _interopRequireDefault(_historyManager);

var _dom = __webpack_require__(10);

var _dom2 = _interopRequireDefault(_dom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Pjax is a static object with main function
 *
 * @namespace Barba.Pjax
 * @borrows Dom as Dom
 * @type {Object}
 */
exports.default = {
  Dom: _dom2.default,
  History: _historyManager2.default,
  Cache: _static2.default,

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
   * Function to be called to start Pjax
   *
   * @memberOf Barba.Pjax
   */
  start: function start() {
    this.init();
  },


  /**
   * Init the events
   *
   * @memberOf Barba.Pjax
   * @private
   */
  init: function init() {
    var container = this.Dom.getContainer();
    var wrapper = this.Dom.getWrapper();

    wrapper.setAttribute('aria-live', 'polite');

    this.History.add(this.getCurrentUrl(), this.Dom.getNamespace(container));

    //Fire for the current view.
    _dispatcher2.default.trigger('initStateChange', this.History.currentStatus());
    _dispatcher2.default.trigger('newPageReady', this.History.currentStatus(), {}, container, this.Dom.currentHTML);
    _dispatcher2.default.trigger('transitionCompleted', this.History.currentStatus());

    this.bindEvents();
  },


  /**
   * Attach the eventlisteners
   *
   * @memberOf Barba.Pjax
   * @private
   */
  bindEvents: function bindEvents() {
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
  getCurrentUrl: function getCurrentUrl() {
    // TODO, clean from what? currenturl do not takes hash..
    return _utils2.default.cleanLink(_utils2.default.getCurrentUrl());
  },


  /**
   * Change the URL with pushstate and trigger the state change
   *
   * @memberOf Barba.Pjax
   * @param {String} newUrl
   */
  goTo: function goTo(url) {
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
  forceGoTo: function forceGoTo(url) {
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
  load: function load(url) {
    var _this = this;

    var deferred = _utils2.default.deferred();

    var request = this.Cache.get(url);

    if (!request) {
      request = _utils2.default.request(url);
      this.Cache.set(url, request);
    }

    request.then(function (data) {
      var container = _this.Dom.parseResponse(data);

      _this.Dom.putContainer(container);

      if (!_this.cacheEnabled) _this.Cache.reset();

      deferred.resolve(container);
    }).catch(function (err) {
      _this.forceGoTo(url);
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
  getHref: function getHref(el) {
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
  onLinkClick: function onLinkClick(evt) {
    var el = evt.target;

    //Go up in the nodelist until we
    //find something with an href
    while (el && !this.getHref(el)) {
      el = el.parentNode;
    }

    if (this.preventCheck(evt, el)) {
      evt.stopPropagation();
      evt.preventDefault();

      _dispatcher2.default.trigger('linkClicked', el, evt);

      var href = this.getHref(el);
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
  preventCheck: function preventCheck(evt, element) {
    if (!window.history.pushState) return false;

    var href = this.getHref(element);

    //User
    if (!element || !href) return false;

    //Middle click, cmd click, and ctrl click
    if (evt.which > 1 || evt.metaKey || evt.ctrlKey || evt.shiftKey || evt.altKey) return false;

    //Ignore target with _blank target
    if (element.target && element.target === '_blank') return false;

    //Check if it's the same domain
    if (window.location.protocol !== element.protocol || window.location.hostname !== element.hostname) return false;

    //Check if the port is the same
    if (_utils2.default.getPort() !== _utils2.default.getPort(element.port)) return false;

    //Ignore case when a hash is being tacked on the current URL
    if (href.indexOf('#') > -1) return false;

    //Ignore case where there is download attribute
    if (element.getAttribute && typeof element.getAttribute('download') === 'string') return false;

    //In case you're trying to load the same page
    if (_utils2.default.cleanLink(href) == _utils2.default.cleanLink(location.href)) return false;

    if (element.classList.contains(this.ignoreClassLink)) return false;

    return true;
  },


  /**
   * Return a transition object
   *
   * @memberOf Barba.Pjax
   * @return {Barba.Transition} Transition object
   */
  getTransition: function getTransition() {
    //User customizable
    return _hideShowTransition2.default;
  },


  /**
   * Method called after a 'popstate' or from .goTo()
   *
   * @memberOf Barba.Pjax
   * @private
   */
  onStateChange: function onStateChange() {
    var newUrl = this.getCurrentUrl();

    if (this.transitionProgress) this.forceGoTo(newUrl);

    if (this.History.currentStatus().url === newUrl) return false;

    this.History.add(newUrl);

    var newContainer = this.load(newUrl);
    var transition = new (this.getTransition())();

    this.transitionProgress = true;

    _dispatcher2.default.trigger('initStateChange', this.History.currentStatus(), this.History.prevStatus());

    var transitionInstance = transition.init(this.Dom.getContainer(), newContainer);

    newContainer.then(this.onNewContainerLoaded.bind(this));

    transitionInstance.then(this.onTransitionEnd.bind(this));
  },


  /**
   * Function called as soon the new container is ready
   *
   * @memberOf Barba.Pjax
   * @private
   * @param {HTMLElement} container
   */
  onNewContainerLoaded: function onNewContainerLoaded(container) {
    var currentStatus = this.History.currentStatus();
    currentStatus.namespace = this.Dom.getNamespace(container);

    _dispatcher2.default.trigger('newPageReady', this.History.currentStatus(), this.History.prevStatus(), container, this.Dom.currentHTML);
  },


  /**
   * Function called as soon the transition is finished
   *
   * @memberOf Barba.Pjax
   * @private
   */
  onTransitionEnd: function onTransitionEnd() {
    this.transitionProgress = false;

    _dispatcher2.default.trigger('transitionCompleted', this.History.currentStatus(), this.History.prevStatus());
  }
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * BaseTransition to extend
 *
 * @namespace Barba.BaseTransition
 * @type {Object}
 */
var BaseTransition = function () {
  function BaseTransition() {
    _classCallCheck(this, BaseTransition);

    this.oldContainer = undefined;
    this.newContainer = undefined;
    this.newContainerLoading = undefined;
  }

  /**
   * This function is called from Pjax module to initialize
   * the transition.
   *
   * @memberOf Barba.BaseTransition
   * @private
   * @param  {HTMLElement} oldContainer
   * @param  {Promise} newContainer
   * @return {Promise}
   */


  _createClass(BaseTransition, [{
    key: 'init',
    value: function init(oldContainer, newContainer) {
      var _this = this;

      this.oldContainer = oldContainer;
      this._newContainerPromise = newContainer;

      this.deferred = _utils2.default.deferred();
      this.newContainerReady = _utils2.default.deferred();
      this.newContainerLoading = this.newContainerReady.promise;

      this.start();

      this._newContainerPromise.then(function (newContainer) {
        _this.newContainer = newContainer;
        _this.newContainerReady.resolve();
      });

      return this.deferred.promise;
    }

    /**
     * This function needs to be called as soon the Transition is finished
     *
     * @memberOf Barba.BaseTransition
     */

  }, {
    key: 'done',
    value: function done() {
      this.oldContainer.parentNode.removeChild(this.oldContainer);
      this.newContainer.style.visibility = 'visible';
      this.deferred.resolve();
    }

    /**
     * Constructor for your Transition
     *
     * @memberOf Barba.BaseTransition
     * @abstract
     */

  }, {
    key: 'start',
    value: function start() {}
  }]);

  return BaseTransition;
}();

exports.default = BaseTransition;
;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

var _pjax = __webpack_require__(4);

var _pjax2 = _interopRequireDefault(_pjax);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Prefetch
 *
 * @namespace Barba.Prefetch
 * @type {Object}
 */
exports.default = {
  /**
   * Class name used to ignore prefetch on links
   *
   * @memberOf Barba.Prefetch
   * @type {String}
   * @default
   */
  ignoreClassLink: 'no-barba-prefetch',

  /**
   * Init the event listener on mouseover and touchstart
   * for the prefetch
   *
   * @memberOf Barba.Prefetch
   */
  init: function init() {
    if (!window.history.pushState) {
      return false;
    }

    this.onLinkEnter = this.onLinkEnter.bind(this);

    document.body.addEventListener('mouseover', this.onLinkEnter);
    document.body.addEventListener('touchstart', this.onLinkEnter);
  },


  /**
   * Callback for the mousehover/touchstart
   *
   * @memberOf Barba.Prefetch
   * @private
   * @param  {Object} evt
   */
  onLinkEnter: function onLinkEnter(evt) {
    var el = evt.target;

    while (el && !_pjax2.default.getHref(el)) {
      el = el.parentNode;
    }

    if (!el || el.classList.contains(this.ignoreClassLink)) {
      return;
    }

    var url = _pjax2.default.getHref(el);

    // Check if the link is elegible for Pjax
    if (_pjax2.default.preventCheck(evt, el) && !_pjax2.default.Cache.get(url)) {
      var request = _utils2.default.request(url);
      _pjax2.default.Cache.set(url, request);
    }
  }
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dispatcher = __webpack_require__(1);

var _dispatcher2 = _interopRequireDefault(_dispatcher);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BaseView = function () {
  function BaseView() {
    _classCallCheck(this, BaseView);

    this.namespace = null;
  }

  _createClass(BaseView, [{
    key: 'init',
    value: function init() {
      var _this = this;

      _dispatcher2.default.on('initStateChange', function (newStatus, oldStatus) {
        if (oldStatus && oldStatus.namespace === _this.namespace) _this.onLeave();
      });

      _dispatcher2.default.on('newPageReady', function (newStatus, oldStatus, container) {
        _this.container = container;

        if (newStatus.namespace === _this.namespace) _this.onEnter();
      });

      _dispatcher2.default.on('transitionCompleted', function (newStatus, oldStatus) {
        if (newStatus.namespace === _this.namespace) _this.onEnterCompleted();

        if (oldStatus && oldStatus.namespace === _this.namespace) _this.onLeaveCompleted();
      });
    }

    /**
     * This function will be fired when the container
     * is ready and attached to the DOM.
     *
     * @memberOf Barba.BaseView
     * @abstract
     */

  }, {
    key: 'onEnter',
    value: function onEnter() {}

    /**
     * This function will be fired when the transition
     * to this container has just finished.
     *
     * @memberOf Barba.BaseView
     * @abstract
     */

  }, {
    key: 'onEnterCompleted',
    value: function onEnterCompleted() {}

    /**
     * This function will be fired when the transition
     * to a new container has just started.
     *
     * @memberOf Barba.BaseView
     * @abstract
     */

  }, {
    key: 'onLeave',
    value: function onLeave() {}

    /**
     * This function will be fired when the container
     * has just been removed from the DOM.
     *
     * @memberOf Barba.BaseView
     * @abstract
     */

  }, {
    key: 'onLeaveCompleted',
    value: function onLeaveCompleted() {}
  }]);

  return BaseView;
}();

exports.default = BaseView;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(setImmediate) {(function (root) {

  // Store setTimeout reference so promise-polyfill will be unaffected by
  // other code modifying setTimeout (like sinon.useFakeTimers())
  var setTimeoutFunc = setTimeout;

  function noop() {}
  
  // Polyfill for Function.prototype.bind
  function bind(fn, thisArg) {
    return function () {
      fn.apply(thisArg, arguments);
    };
  }

  function Promise(fn) {
    if (typeof this !== 'object') throw new TypeError('Promises must be constructed via new');
    if (typeof fn !== 'function') throw new TypeError('not a function');
    this._state = 0;
    this._handled = false;
    this._value = undefined;
    this._deferreds = [];

    doResolve(fn, this);
  }

  function handle(self, deferred) {
    while (self._state === 3) {
      self = self._value;
    }
    if (self._state === 0) {
      self._deferreds.push(deferred);
      return;
    }
    self._handled = true;
    Promise._immediateFn(function () {
      var cb = self._state === 1 ? deferred.onFulfilled : deferred.onRejected;
      if (cb === null) {
        (self._state === 1 ? resolve : reject)(deferred.promise, self._value);
        return;
      }
      var ret;
      try {
        ret = cb(self._value);
      } catch (e) {
        reject(deferred.promise, e);
        return;
      }
      resolve(deferred.promise, ret);
    });
  }

  function resolve(self, newValue) {
    try {
      // Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
      if (newValue === self) throw new TypeError('A promise cannot be resolved with itself.');
      if (newValue && (typeof newValue === 'object' || typeof newValue === 'function')) {
        var then = newValue.then;
        if (newValue instanceof Promise) {
          self._state = 3;
          self._value = newValue;
          finale(self);
          return;
        } else if (typeof then === 'function') {
          doResolve(bind(then, newValue), self);
          return;
        }
      }
      self._state = 1;
      self._value = newValue;
      finale(self);
    } catch (e) {
      reject(self, e);
    }
  }

  function reject(self, newValue) {
    self._state = 2;
    self._value = newValue;
    finale(self);
  }

  function finale(self) {
    if (self._state === 2 && self._deferreds.length === 0) {
      Promise._immediateFn(function() {
        if (!self._handled) {
          Promise._unhandledRejectionFn(self._value);
        }
      });
    }

    for (var i = 0, len = self._deferreds.length; i < len; i++) {
      handle(self, self._deferreds[i]);
    }
    self._deferreds = null;
  }

  function Handler(onFulfilled, onRejected, promise) {
    this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
    this.onRejected = typeof onRejected === 'function' ? onRejected : null;
    this.promise = promise;
  }

  /**
   * Take a potentially misbehaving resolver function and make sure
   * onFulfilled and onRejected are only called once.
   *
   * Makes no guarantees about asynchrony.
   */
  function doResolve(fn, self) {
    var done = false;
    try {
      fn(function (value) {
        if (done) return;
        done = true;
        resolve(self, value);
      }, function (reason) {
        if (done) return;
        done = true;
        reject(self, reason);
      });
    } catch (ex) {
      if (done) return;
      done = true;
      reject(self, ex);
    }
  }

  Promise.prototype['catch'] = function (onRejected) {
    return this.then(null, onRejected);
  };

  Promise.prototype.then = function (onFulfilled, onRejected) {
    var prom = new (this.constructor)(noop);

    handle(this, new Handler(onFulfilled, onRejected, prom));
    return prom;
  };

  Promise.all = function (arr) {
    var args = Array.prototype.slice.call(arr);

    return new Promise(function (resolve, reject) {
      if (args.length === 0) return resolve([]);
      var remaining = args.length;

      function res(i, val) {
        try {
          if (val && (typeof val === 'object' || typeof val === 'function')) {
            var then = val.then;
            if (typeof then === 'function') {
              then.call(val, function (val) {
                res(i, val);
              }, reject);
              return;
            }
          }
          args[i] = val;
          if (--remaining === 0) {
            resolve(args);
          }
        } catch (ex) {
          reject(ex);
        }
      }

      for (var i = 0; i < args.length; i++) {
        res(i, args[i]);
      }
    });
  };

  Promise.resolve = function (value) {
    if (value && typeof value === 'object' && value.constructor === Promise) {
      return value;
    }

    return new Promise(function (resolve) {
      resolve(value);
    });
  };

  Promise.reject = function (value) {
    return new Promise(function (resolve, reject) {
      reject(value);
    });
  };

  Promise.race = function (values) {
    return new Promise(function (resolve, reject) {
      for (var i = 0, len = values.length; i < len; i++) {
        values[i].then(resolve, reject);
      }
    });
  };

  // Use polyfill for setImmediate for performance gains
  Promise._immediateFn = (typeof setImmediate === 'function' && function (fn) { setImmediate(fn); }) ||
    function (fn) {
      setTimeoutFunc(fn, 0);
    };

  Promise._unhandledRejectionFn = function _unhandledRejectionFn(err) {
    if (typeof console !== 'undefined' && console) {
      console.warn('Possible Unhandled Promise Rejection:', err); // eslint-disable-line no-console
    }
  };

  /**
   * Set the immediate function to execute callbacks
   * @param fn {function} Function to execute
   * @deprecated
   */
  Promise._setImmediateFn = function _setImmediateFn(fn) {
    Promise._immediateFn = fn;
  };

  /**
   * Change the function to execute on unhandled rejection
   * @param {function} fn Function to execute on unhandled rejection
   * @deprecated
   */
  Promise._setUnhandledRejectionFn = function _setUnhandledRejectionFn(fn) {
    Promise._unhandledRejectionFn = fn;
  };
  
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = Promise;
  } else if (!root.Promise) {
    root.Promise = Promise;
  }

})(this);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(14).setImmediate))

/***/ }),
/* 9 */
/***/ (function(module, exports) {

(function(self) {
  'use strict';

  if (self.fetch) {
    return
  }

  var support = {
    searchParams: 'URLSearchParams' in self,
    iterable: 'Symbol' in self && 'iterator' in Symbol,
    blob: 'FileReader' in self && 'Blob' in self && (function() {
      try {
        new Blob()
        return true
      } catch(e) {
        return false
      }
    })(),
    formData: 'FormData' in self,
    arrayBuffer: 'ArrayBuffer' in self
  }

  if (support.arrayBuffer) {
    var viewClasses = [
      '[object Int8Array]',
      '[object Uint8Array]',
      '[object Uint8ClampedArray]',
      '[object Int16Array]',
      '[object Uint16Array]',
      '[object Int32Array]',
      '[object Uint32Array]',
      '[object Float32Array]',
      '[object Float64Array]'
    ]

    var isDataView = function(obj) {
      return obj && DataView.prototype.isPrototypeOf(obj)
    }

    var isArrayBufferView = ArrayBuffer.isView || function(obj) {
      return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1
    }
  }

  function normalizeName(name) {
    if (typeof name !== 'string') {
      name = String(name)
    }
    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
      throw new TypeError('Invalid character in header field name')
    }
    return name.toLowerCase()
  }

  function normalizeValue(value) {
    if (typeof value !== 'string') {
      value = String(value)
    }
    return value
  }

  // Build a destructive iterator for the value list
  function iteratorFor(items) {
    var iterator = {
      next: function() {
        var value = items.shift()
        return {done: value === undefined, value: value}
      }
    }

    if (support.iterable) {
      iterator[Symbol.iterator] = function() {
        return iterator
      }
    }

    return iterator
  }

  function Headers(headers) {
    this.map = {}

    if (headers instanceof Headers) {
      headers.forEach(function(value, name) {
        this.append(name, value)
      }, this)

    } else if (headers) {
      Object.getOwnPropertyNames(headers).forEach(function(name) {
        this.append(name, headers[name])
      }, this)
    }
  }

  Headers.prototype.append = function(name, value) {
    name = normalizeName(name)
    value = normalizeValue(value)
    var oldValue = this.map[name]
    this.map[name] = oldValue ? oldValue+','+value : value
  }

  Headers.prototype['delete'] = function(name) {
    delete this.map[normalizeName(name)]
  }

  Headers.prototype.get = function(name) {
    name = normalizeName(name)
    return this.has(name) ? this.map[name] : null
  }

  Headers.prototype.has = function(name) {
    return this.map.hasOwnProperty(normalizeName(name))
  }

  Headers.prototype.set = function(name, value) {
    this.map[normalizeName(name)] = normalizeValue(value)
  }

  Headers.prototype.forEach = function(callback, thisArg) {
    for (var name in this.map) {
      if (this.map.hasOwnProperty(name)) {
        callback.call(thisArg, this.map[name], name, this)
      }
    }
  }

  Headers.prototype.keys = function() {
    var items = []
    this.forEach(function(value, name) { items.push(name) })
    return iteratorFor(items)
  }

  Headers.prototype.values = function() {
    var items = []
    this.forEach(function(value) { items.push(value) })
    return iteratorFor(items)
  }

  Headers.prototype.entries = function() {
    var items = []
    this.forEach(function(value, name) { items.push([name, value]) })
    return iteratorFor(items)
  }

  if (support.iterable) {
    Headers.prototype[Symbol.iterator] = Headers.prototype.entries
  }

  function consumed(body) {
    if (body.bodyUsed) {
      return Promise.reject(new TypeError('Already read'))
    }
    body.bodyUsed = true
  }

  function fileReaderReady(reader) {
    return new Promise(function(resolve, reject) {
      reader.onload = function() {
        resolve(reader.result)
      }
      reader.onerror = function() {
        reject(reader.error)
      }
    })
  }

  function readBlobAsArrayBuffer(blob) {
    var reader = new FileReader()
    var promise = fileReaderReady(reader)
    reader.readAsArrayBuffer(blob)
    return promise
  }

  function readBlobAsText(blob) {
    var reader = new FileReader()
    var promise = fileReaderReady(reader)
    reader.readAsText(blob)
    return promise
  }

  function readArrayBufferAsText(buf) {
    var view = new Uint8Array(buf)
    var chars = new Array(view.length)

    for (var i = 0; i < view.length; i++) {
      chars[i] = String.fromCharCode(view[i])
    }
    return chars.join('')
  }

  function bufferClone(buf) {
    if (buf.slice) {
      return buf.slice(0)
    } else {
      var view = new Uint8Array(buf.byteLength)
      view.set(new Uint8Array(buf))
      return view.buffer
    }
  }

  function Body() {
    this.bodyUsed = false

    this._initBody = function(body) {
      this._bodyInit = body
      if (!body) {
        this._bodyText = ''
      } else if (typeof body === 'string') {
        this._bodyText = body
      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
        this._bodyBlob = body
      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
        this._bodyFormData = body
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this._bodyText = body.toString()
      } else if (support.arrayBuffer && support.blob && isDataView(body)) {
        this._bodyArrayBuffer = bufferClone(body.buffer)
        // IE 10-11 can't handle a DataView body.
        this._bodyInit = new Blob([this._bodyArrayBuffer])
      } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
        this._bodyArrayBuffer = bufferClone(body)
      } else {
        throw new Error('unsupported BodyInit type')
      }

      if (!this.headers.get('content-type')) {
        if (typeof body === 'string') {
          this.headers.set('content-type', 'text/plain;charset=UTF-8')
        } else if (this._bodyBlob && this._bodyBlob.type) {
          this.headers.set('content-type', this._bodyBlob.type)
        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8')
        }
      }
    }

    if (support.blob) {
      this.blob = function() {
        var rejected = consumed(this)
        if (rejected) {
          return rejected
        }

        if (this._bodyBlob) {
          return Promise.resolve(this._bodyBlob)
        } else if (this._bodyArrayBuffer) {
          return Promise.resolve(new Blob([this._bodyArrayBuffer]))
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as blob')
        } else {
          return Promise.resolve(new Blob([this._bodyText]))
        }
      }

      this.arrayBuffer = function() {
        if (this._bodyArrayBuffer) {
          return consumed(this) || Promise.resolve(this._bodyArrayBuffer)
        } else {
          return this.blob().then(readBlobAsArrayBuffer)
        }
      }
    }

    this.text = function() {
      var rejected = consumed(this)
      if (rejected) {
        return rejected
      }

      if (this._bodyBlob) {
        return readBlobAsText(this._bodyBlob)
      } else if (this._bodyArrayBuffer) {
        return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer))
      } else if (this._bodyFormData) {
        throw new Error('could not read FormData body as text')
      } else {
        return Promise.resolve(this._bodyText)
      }
    }

    if (support.formData) {
      this.formData = function() {
        return this.text().then(decode)
      }
    }

    this.json = function() {
      return this.text().then(JSON.parse)
    }

    return this
  }

  // HTTP methods whose capitalization should be normalized
  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']

  function normalizeMethod(method) {
    var upcased = method.toUpperCase()
    return (methods.indexOf(upcased) > -1) ? upcased : method
  }

  function Request(input, options) {
    options = options || {}
    var body = options.body

    if (input instanceof Request) {
      if (input.bodyUsed) {
        throw new TypeError('Already read')
      }
      this.url = input.url
      this.credentials = input.credentials
      if (!options.headers) {
        this.headers = new Headers(input.headers)
      }
      this.method = input.method
      this.mode = input.mode
      if (!body && input._bodyInit != null) {
        body = input._bodyInit
        input.bodyUsed = true
      }
    } else {
      this.url = String(input)
    }

    this.credentials = options.credentials || this.credentials || 'omit'
    if (options.headers || !this.headers) {
      this.headers = new Headers(options.headers)
    }
    this.method = normalizeMethod(options.method || this.method || 'GET')
    this.mode = options.mode || this.mode || null
    this.referrer = null

    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
      throw new TypeError('Body not allowed for GET or HEAD requests')
    }
    this._initBody(body)
  }

  Request.prototype.clone = function() {
    return new Request(this, { body: this._bodyInit })
  }

  function decode(body) {
    var form = new FormData()
    body.trim().split('&').forEach(function(bytes) {
      if (bytes) {
        var split = bytes.split('=')
        var name = split.shift().replace(/\+/g, ' ')
        var value = split.join('=').replace(/\+/g, ' ')
        form.append(decodeURIComponent(name), decodeURIComponent(value))
      }
    })
    return form
  }

  function parseHeaders(rawHeaders) {
    var headers = new Headers()
    rawHeaders.split(/\r?\n/).forEach(function(line) {
      var parts = line.split(':')
      var key = parts.shift().trim()
      if (key) {
        var value = parts.join(':').trim()
        headers.append(key, value)
      }
    })
    return headers
  }

  Body.call(Request.prototype)

  function Response(bodyInit, options) {
    if (!options) {
      options = {}
    }

    this.type = 'default'
    this.status = 'status' in options ? options.status : 200
    this.ok = this.status >= 200 && this.status < 300
    this.statusText = 'statusText' in options ? options.statusText : 'OK'
    this.headers = new Headers(options.headers)
    this.url = options.url || ''
    this._initBody(bodyInit)
  }

  Body.call(Response.prototype)

  Response.prototype.clone = function() {
    return new Response(this._bodyInit, {
      status: this.status,
      statusText: this.statusText,
      headers: new Headers(this.headers),
      url: this.url
    })
  }

  Response.error = function() {
    var response = new Response(null, {status: 0, statusText: ''})
    response.type = 'error'
    return response
  }

  var redirectStatuses = [301, 302, 303, 307, 308]

  Response.redirect = function(url, status) {
    if (redirectStatuses.indexOf(status) === -1) {
      throw new RangeError('Invalid status code')
    }

    return new Response(null, {status: status, headers: {location: url}})
  }

  self.Headers = Headers
  self.Request = Request
  self.Response = Response

  self.fetch = function(input, init) {
    return new Promise(function(resolve, reject) {
      var request = new Request(input, init)
      var xhr = new XMLHttpRequest()

      xhr.onload = function() {
        var options = {
          status: xhr.status,
          statusText: xhr.statusText,
          headers: parseHeaders(xhr.getAllResponseHeaders() || '')
        }
        options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL')
        var body = 'response' in xhr ? xhr.response : xhr.responseText
        resolve(new Response(body, options))
      }

      xhr.onerror = function() {
        reject(new TypeError('Network request failed'))
      }

      xhr.ontimeout = function() {
        reject(new TypeError('Network request failed'))
      }

      xhr.open(request.method, request.url, true)

      if (request.credentials === 'include') {
        xhr.withCredentials = true
      }

      if ('responseType' in xhr && support.blob) {
        xhr.responseType = 'blob'
      }

      request.headers.forEach(function(value, name) {
        xhr.setRequestHeader(name, value)
      })

      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
    })
  }
  self.fetch.polyfill = true
})(typeof self !== 'undefined' ? self : this);


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Object that is going to deal with DOM parsing/manipulation
 *
 * @namespace Barba.Pjax.Dom
 * @type {Object}
 */
exports.default = {
  /**
   * The name of the data attribute on the container
   *
   * @memberOf Barba.Pjax.Dom
   * @type {String}
   * @default
   */
  dataNamespace: 'namespace',

  /**
   * Id of the main wrapper
   *
   * @memberOf Barba.Pjax.Dom
   * @type {String}
   * @default
   */
  wrapperId: 'barba-wrapper',

  /**
   * Class name used to identify the containers
   *
   * @memberOf Barba.Pjax.Dom
   * @type {String}
   * @default
   */
  containerClass: 'barba-container',

  /**
   * Full HTML String of the current page.
   * By default is the innerHTML of the initial loaded page.
   *
   * Each time a new page is loaded, the value is the response of the ajax call.
   *
   * @memberOf Barba.Pjax.Dom
   * @type {String}
   */
  currentHTML: document.documentElement.innerHTML,

  /**
   * Parse the responseText obtained from the ajax call
   *
   * @memberOf Barba.Pjax.Dom
   * @private
   * @param  {String} responseText
   * @return {HTMLElement}
   */
  parseResponse: function parseResponse(responseText) {
    this.currentHTML = responseText;

    var wrapper = document.createElement('div');
    wrapper.innerHTML = responseText;

    var titleEl = wrapper.querySelector('title');

    if (titleEl) document.title = titleEl.textContent;

    return this.getContainer(wrapper);
  },


  /**
   * Get the main barba wrapper by the ID `wrapperId`
   *
   * @memberOf Barba.Pjax.Dom
   * @return {HTMLElement} element
   */
  getWrapper: function getWrapper() {
    var wrapper = document.getElementById(this.wrapperId);

    if (!wrapper) throw new Error('Barba.js: wrapper not found!');

    return wrapper;
  },


  /**
   * Get the container on the current DOM,
   * or from an HTMLElement passed via argument
   *
   * @memberOf Barba.Pjax.Dom
   * @private
   * @param  {HTMLElement} element
   * @return {HTMLElement}
   */
  getContainer: function getContainer(element) {
    if (!element) element = document.body;

    if (!element) throw new Error('Barba.js: DOM not ready!');

    var container = this.parseContainer(element);

    if (!container) throw new Error('Barba.js: no container found');

    return container;
  },


  /**
   * Get the namespace of the container
   *
   * @memberOf Barba.Pjax.Dom
   * @private
   * @param  {HTMLElement} element
   * @return {String}
   */
  getNamespace: function getNamespace(element) {
    if (!element) {
      return null;
    }

    return element.getAttribute('data-' + this.dataNamespace);
  },


  /**
   * Put the container on the page
   *
   * @memberOf Barba.Pjax.Dom
   * @private
   * @param  {HTMLElement} element
   */
  putContainer: function putContainer(element) {
    element.style.visibility = 'hidden';

    var wrapper = this.getWrapper();
    wrapper.appendChild(element);
  },


  /**
   * Get container selector
   *
   * @memberOf Barba.Pjax.Dom
   * @private
   * @param  {HTMLElement} element
   * @return {HTMLElement} element
   */
  parseContainer: function parseContainer(element) {
    return element.querySelector('.' + this.containerClass);
  }
};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _baseTransition = __webpack_require__(5);

var _baseTransition2 = _interopRequireDefault(_baseTransition);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HideShowTransition = function (_BaseTransition) {
  _inherits(HideShowTransition, _BaseTransition);

  function HideShowTransition() {
    _classCallCheck(this, HideShowTransition);

    return _possibleConstructorReturn(this, (HideShowTransition.__proto__ || Object.getPrototypeOf(HideShowTransition)).apply(this, arguments));
  }

  _createClass(HideShowTransition, [{
    key: 'start',
    value: function start() {
      this.newContainerLoading.then(this.finish.bind(this));
    }
  }, {
    key: 'finish',
    value: function finish() {
      window.scrollTo(0, 0);
      this.done();
    }
  }]);

  return HideShowTransition;
}(_baseTransition2.default);

exports.default = HideShowTransition;

/***/ }),
/* 12 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(15), __webpack_require__(12)))

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(window, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(13);
exports.setImmediate = setImmediate;
exports.clearImmediate = clearImmediate;


/***/ }),
/* 15 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(9);

var _promisePolyfill = __webpack_require__(8);

var _promisePolyfill2 = _interopRequireDefault(_promisePolyfill);

var _baseTransition = __webpack_require__(5);

var _baseTransition2 = _interopRequireDefault(_baseTransition);

var _baseView = __webpack_require__(7);

var _baseView2 = _interopRequireDefault(_baseView);

var _static = __webpack_require__(2);

var _static2 = _interopRequireDefault(_static);

var _dispatcher = __webpack_require__(1);

var _dispatcher2 = _interopRequireDefault(_dispatcher);

var _historyManager = __webpack_require__(3);

var _historyManager2 = _interopRequireDefault(_historyManager);

var _pjax = __webpack_require__(4);

var _pjax2 = _interopRequireDefault(_pjax);

var _prefetch = __webpack_require__(6);

var _prefetch2 = _interopRequireDefault(_prefetch);

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (!window.Promise) {
  window.Promise = _promisePolyfill2.default;
}

module.exports = {
  version: "2.0.0",
  BaseTransition: _baseTransition2.default,
  BaseView: _baseView2.default,
  Cache: _static2.default,
  Dispatcher: _dispatcher2.default,
  HistoryManager: _historyManager2.default,
  Pjax: _pjax2.default,
  Prefetch: _prefetch2.default,
  Utils: _utils2.default
};

/***/ })
/******/ ]);
});
//# sourceMappingURL=barba.js.map