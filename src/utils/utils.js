/**
 * Just an object with some helpful functions
 *
 * @type {Object}
 * @namespace Barba.Utils
 */
export default {
  /**
   * Return the current url
   *
   * @memberOf Barba.Utils
   * @return {String} currentUrl
   */
  getCurrentUrl() {
    // Todo add hash
    return window.location.protocol + '//' +
           window.location.host +
           window.location.pathname +
           window.location.search;
  },

  /**
   * Given an url, return it without the hash
   *
   * @memberOf Barba.Utils
   * @private
   * @param  {String} url
   * @return {String} newCleanUrl
   */
  cleanLink(url) {
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
  request(url) {
    // TODO implement timeout!
    const dfd = this.deferred();

    const timeout = window.setTimeout(() => {
      dfd.reject(new Error('timeout!'));
    }, this.requestTimeout);

    const headers = new Headers();
    headers.append('x-barba', 'yes');

    fetch(url, {
      method: 'GET',
      headers,
      cache: 'default',
    }).then(res => {
      window.clearTimeout(timeout);

      if (res.status >= 200 && res.status < 300){
        return dfd.resolve(res.text());
      }

      const err = new Error(res.statusText || res.status);
      return dfd.reject(err);
    }).catch(err => {
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
  deferred() {
    return new function() {
      this.resolve = null;
      this.reject = null;

      this.promise = new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
      });
    };
  },

  /**
   * Return the port number normalized, eventually you can pass a string to be normalized.
   *
   * @memberOf Barba.Utils
   * @private
   * @param  {String} p
   * @return {Int} port
   */
  getPort(p) {
    const port = typeof p !== 'undefined' ? p : window.location.port;
    const protocol = window.location.protocol;

    if (port != '')
      return parseInt(port);

    if (protocol === 'http:')
      return 80;

    if (protocol === 'https:')
      return 443;
  }
};
