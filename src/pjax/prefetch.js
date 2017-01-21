import Utils from '../utils/utils';
import Pjax from './pjax';

/**
 * Prefetch
 *
 * @namespace Barba.Prefetch
 * @type {Object}
 */
export default {
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
  init() {
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
  onLinkEnter(evt) {
    let el = evt.target;

    while (el && !Pjax.getHref(el)) {
      el = el.parentNode;
    }

    if (!el || el.classList.contains(this.ignoreClassLink)) {
      return;
    }

    const url = Pjax.getHref(el);

    // Check if the link is elegible for Pjax
    if (Pjax.preventCheck(evt, el) && !Pjax.Cache.get(url)) {
      const request = Utils.request(url);
      Pjax.Cache.set(url, request);
    }
  }
};
