import Dispatcher from '../dispatcher/dispatcher';

export default class BaseView {
  constructor() {
    this.namespace = null;
  }

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
   *
   * @memberOf Barba.BaseView
   * @abstract
   */
   onEnter() {}

   /**
    * This function will be fired when the transition
    * to this container has just finished.
    *
    * @memberOf Barba.BaseView
    * @abstract
    */
   onEnterCompleted() {}

   /**
    * This function will be fired when the transition
    * to a new container has just started.
    *
    * @memberOf Barba.BaseView
    * @abstract
    */
   onLeave() {}

   /**
    * This function will be fired when the container
    * has just been removed from the DOM.
    *
    * @memberOf Barba.BaseView
    * @abstract
    */
   onLeaveCompleted() {}
}
