import Utils from '../utils/utils';

/**
 * BaseTransition to extend
 *
 * @namespace Barba.BaseTransition
 * @type {Object}
 */
export default class BaseTransition {
  constructor() {
    this.oldContainer = undefined;
    this.newContainer = undefined;
    this.newContainerLoading = undefined;
  }

  /**
   * This function is called from Pjax module to initialize
   * the transition.
   *
   * @memberOf Barba.BaseTransition
   * @private
   * @param  {HTMLElement} oldContainer
   * @param  {Promise} newContainer
   * @return {Promise}
   */
  init(oldContainer, newContainer) {
    this.oldContainer = oldContainer;
    this._newContainerPromise = newContainer;

    this.deferred = Utils.deferred();
    this.newContainerReady = Utils.deferred();
    this.newContainerLoading = this.newContainerReady.promise;

    this.start();

    this._newContainerPromise.then(newContainer => {
      this.newContainer = newContainer;
      this.newContainerReady.resolve();
    });

    return this.deferred.promise;
  }

  /**
   * This function needs to be called as soon the Transition is finished
   *
   * @memberOf Barba.BaseTransition
   */
  done() {
    this.oldContainer.parentNode.removeChild(this.oldContainer);
    this.newContainer.style.visibility = 'visible';
    this.deferred.resolve();
  }

  /**
   * Constructor for your Transition
   *
   * @memberOf Barba.BaseTransition
   * @abstract
   */
  start() {

  }
};
