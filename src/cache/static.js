/**
 * Simple static cache
 *
 * @namespace Barba.Cache
 * @type {Object}
 */
export default {
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
  set(key, val) {
    this.data[key] = val;
  },

  /**
   * Retrieve the data using the key
   *
   * @memberOf Barba.Cache
   * @param  {String} key
   * @return {*}
   */
  get(key) {
    return this.data[key];
  },

  /**
   * Flush the cache
   *
   * @memberOf Barba.Cache
   */
  reset() {
    this.data = {};
  }
};
