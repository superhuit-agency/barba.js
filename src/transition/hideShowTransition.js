import Transition from './transition';

export default class HideShowTransition extends Transition {
  start() {
    this.newContainerLoading.then(this.finish.bind(this));
  }

  finish() {
    window.scrollTo(0,0);
    this.done();
  }
}
