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
   * Time in millisecond after the xhr request goes in timeout
   *
   * @memberOf Barba.Utils
   * @type {Number}
   * @default
   */
  xhrTimeout: 5000,

  /**
   * Start an XMLHttpRequest() and return a Promise
   *
   * @memberOf Barba.Utils
   * @param  {String} url
   * @return {Promise}
   */
  xhr(url) {
    // const deferred = this.deferred();
    // let timeout;

    // new Promise((resolve, reject) => {
    //   timeout = window.setTimeout(() => {
    //     reject(new Error('xhr: Timeout exceeded'));
    //   }, this.xhrTimeout);
    // });

    const dfd = this.deferred();

    const headers = new Headers();
    headers.append('x-barba', 'yes');

    fetch(url, {
      method: 'GET',
      headers,
      cache: 'default',
    }).then(res => {
      if (res.status >= 200 && res.status < 300){
        return dfd.resolve(res.text());
      }

      const err = new Error(res.statusText || res.status);
      return dfd.reject(err);
    }).catch(err => {
      dfd.reject(err);
    });


    return dfd.promise;

    // var deferred = this.deferred();
    // var req = new XMLHttpRequest();

    // req.onreadystatechange = () => {
    //   if (req.readyState === 4) {
    //     // TODO CHECK THIS
    //     if (req.status === 200) {
    //       return deferred.resolve(req.responseText);
    //     } else {
    //       return deferred.reject(new Error('xhr: HTTP code is not 200'));
    //     }
    //   }
    // };

    // req.ontimeout = () => {
    //   return deferred.reject(new Error('xhr: Timeout exceeded'));
    // };

    // req.open('GET', url);
    // req.timeout = this.xhrTimeout;
    // req.setRequestHeader('x-barba', 'yes');
    // req.send();

    // return deferred.promise;
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
    var port = typeof p !== 'undefined' ? p : window.location.port;
    var protocol = window.location.protocol;

    if (port != '')
      return parseInt(port);

    if (protocol === 'http:')
      return 80;

    if (protocol === 'https:')
      return 443;
  }
};
