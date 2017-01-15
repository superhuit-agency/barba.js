/**
 * Little Dispatcher inspired by MicroEvent.js
 *
 * @namespace Barba.Dispatcher
 * @type {Object}
 */
export default {
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
  on(e, f) {
    this.events[e] = this.events[e] || [];
    this.events[e].push(f);
  },

  once(e, f) {
    let self = this;

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
  off(e, f) {
    if(e in this.events === false)
      return;

    this.events[e].splice(this.events[e].indexOf(f), 1);
  },

  /**
   * Fire the event running all the event associated to it
   *
   * @memberOf Barba.Dispatcher
   * @param  {String} eventName
   * @param  {...*} args
   */
  trigger(e) {//e, ...args
    if (e in this.events === false)
      return;

    for(let i = 0; i < this.events[e].length; i++){
      this.events[e][i].apply(this, Array.prototype.slice.call(arguments, 1));
    }
  }
};
