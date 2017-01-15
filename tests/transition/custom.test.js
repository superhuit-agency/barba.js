import Barba from '../../src/index';
jest.useFakeTimers();

class FadeTransition extends Barba.BaseTransition {
  start() {
    Promise.all([
      this.fadeOut(),
      this.newContainerLoading,
    ]).then(this.fadeIn.bind(this));
  }

  fadeOut() {
    return new Promise((resolve, reject) => {
      this.oldContainer.style.opacity = 0;
      setTimeout(resolve, 200);
    });
  }

  fadeIn() {
    console.log(this.newContainer);
    this.newContainer.style.opacity = 1;
    setTimeout(this.done.bind(this), 200);
  }
}

const instance = new FadeTransition();

const fakeParent = document.createElement('div');

const oldContainer = document.createElement('div');
      oldContainer.setAttribute('class', 'oldcontainer');
      oldContainer.style.opacity = 1;

const newContainer = document.createElement('div');
      newContainer.setAttribute('class', 'newContainer');
      newContainer.style.visibility = 'hidden';
      oldContainer.style.opacity = 0;

fakeParent.appendChild(oldContainer);
fakeParent.appendChild(newContainer);

const newContainerPromise = new Promise((resolve, reject) => {
  resolve(newContainer);
});

it('can start', () => {
  expect(typeof instance.init).toBe('function');
  instance.init(oldContainer, newContainerPromise);
});

it('verify transition', () => {

  setTimeout(() => {
    expect(oldContainer.style.opacity).toBe('0');
  }, 250);

  // jest.runAllTimers();

  // setTimeout(() => {
  //   expect(instance.newContainer.style.opacity).toBe('1');
  // }, 450);

  // jest.runAllTimers();
})
