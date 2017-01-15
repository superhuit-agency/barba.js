import Dispatcher from '../dispatcher/dispatcher';

export default class BaseView {
  constructor() {
    this.namespace = null;
  }

  init() {
    var _this = this;

    Dispatcher.on('initStateChange',
      function(newStatus, oldStatus) {
        if (oldStatus && oldStatus.namespace === _this.namespace)
          _this.onLeave();
      }
    );

    Dispatcher.on('newPageReady',
      function(newStatus, oldStatus, container) {
        _this.container = container;

        if (newStatus.namespace === _this.namespace)
          _this.onEnter();
      }
    );

    Dispatcher.on('transitionCompleted',
      function(newStatus, oldStatus) {
        if (newStatus.namespace === _this.namespace)
          _this.onEnterCompleted();

        if (oldStatus && oldStatus.namespace === _this.namespace)
          _this.onLeaveCompleted();
      }
    );
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
