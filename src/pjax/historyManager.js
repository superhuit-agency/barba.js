/**
 * HistoryManager helps to keep track of the navigation
 *
 * @namespace Barba.HistoryManager
 * @type {Object}
 */
export default {
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
  add(url, namespace = undefined) {
    this.history.push({ url, namespace });
  },

  /**
   * Return information about the current status
   *
   * @memberOf Barba.HistoryManager
   * @return {Object}
   */
  currentStatus() {
    return this.history[this.history.length - 1];
  },

  /**
   * Return information about the previous status
   *
   * @memberOf Barba.HistoryManager
   * @return {Object}
   */
  prevStatus() {
    const history = this.history;

    if (history.length < 2)
      return null;

    return history[history.length - 2];
  }
};
