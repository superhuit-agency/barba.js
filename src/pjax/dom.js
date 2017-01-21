/**
 * Object that is going to deal with DOM parsing/manipulation
 *
 * @namespace Barba.Pjax.Dom
 * @type {Object}
 */
export default {
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
  parseResponse(responseText) {
    this.currentHTML = responseText;

    const wrapper = document.createElement('div');
          wrapper.innerHTML = responseText;

    const titleEl = wrapper.querySelector('title');

    if (titleEl)
      document.title = titleEl.textContent;

    return this.getContainer(wrapper);
  },

  /**
   * Get the main barba wrapper by the ID `wrapperId`
   *
   * @memberOf Barba.Pjax.Dom
   * @return {HTMLElement} element
   */
  getWrapper() {
    const wrapper = document.getElementById(this.wrapperId);

    if (!wrapper)
      throw new Error('Barba.js: wrapper not found!');

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
  getContainer(element) {
    if (!element)
      element = document.body;

    if (!element)
      throw new Error('Barba.js: DOM not ready!');

    const container = this.parseContainer(element);

    if (!container)
      throw new Error('Barba.js: no container found');

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
  getNamespace(element) {
    if (!element) {
      return null;
    }

    return element.getAttribute(`data-${this.dataNamespace}`);
  },

  /**
   * Put the container on the page
   *
   * @memberOf Barba.Pjax.Dom
   * @private
   * @param  {HTMLElement} element
   */
  putContainer(element) {
    element.style.visibility = 'hidden';

    const wrapper = this.getWrapper();
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
  parseContainer(element) {
    return element.querySelector(`.${this.containerClass}`);
  }
};
