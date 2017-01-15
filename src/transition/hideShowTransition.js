import BaseTransition from './baseTransition';

export default class HideShowTransition extends BaseTransition {
  start() {
    this.newContainerLoading.then(this.finish.bind(this));
  }

  finish() {
    window.scrollTo(0,0);
    this.done();
  }
}
