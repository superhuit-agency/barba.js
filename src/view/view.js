import Dispatcher from '../dispatcher/dispatcher';

/**
 * View to extend
 *
 * @class
 * @memberOf Barba
 */
export default class View {
  constructor() {
    /**
     * Namespace of the current view
     *
     * @type {String}
     * @member namespace
     * @memberOf Barba.View
     */
    this.namespace = null;

    /**
     * Container associated to this view
     *
     * @type {HTMLElement}
     */
    this.container = null;
  }

  /**
   * Register the view, binding the internal methods
   * against the barba.js Events
   *
   * @member Barba.View#init
   */
  init() {
    Dispatcher.on('initStateChange', (newStatus, oldStatus) => {
      if (oldStatus && oldStatus.namespace === this.namespace)
        this.onLeave();
    });

    Dispatcher.on('newPageReady', (newStatus, oldStatus, container) => {
      this.container = container;

      if (newStatus.namespace === this.namespace)
        this.onEnter();
    });

    Dispatcher.on('transitionCompleted', (newStatus, oldStatus) => {
      if (newStatus.namespace === this.namespace)
        this.onEnterCompleted();

      if (oldStatus && oldStatus.namespace === this.namespace)
        this.onLeaveCompleted();
    });
  }

  /**
   * This function will be fired when the container
   * is ready and attached to the DOM.
   */
   onEnter() {}

   /**
    * This function will be fired when the transition
    * to this container has just finished.
    *
    * @abstract
    */
   onEnterCompleted() {}

   /**
    * This function will be fired when the transition
    * to a new container has just started.
    *
    * @abstract
    */
   onLeave() {}

   /**
    * This function will be fired when the container
    * has just been removed from the DOM.
    *
    * @abstract
    */
   onLeaveCompleted() {}
}
