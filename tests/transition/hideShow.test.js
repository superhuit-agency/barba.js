import Barba from '../../src/index';
import HideShowTransition from '../../src/transition/hideShowTransition';

it('exists', () => {
  expect(typeof HideShowTransition).toBe('function');

  let instance = new HideShowTransition();
  expect(instance instanceof Barba.BaseTransition).toBeTruthy();
  expect(typeof instance.start).toBe('function');
  expect(typeof instance.finish).toBe('function');
});

it('init', () => {
  let instance = new HideShowTransition();

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

  instance.init(oldContainer, newContainerPromise);
});
