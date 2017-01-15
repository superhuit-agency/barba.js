import Barba from '../../src/index';

const fakeParent = document.createElement('div');

const oldContainer = document.createElement('div');
      oldContainer.setAttribute('class', 'oldcontainer');

const newContainer = document.createElement('div');
      newContainer.setAttribute('class', 'newContainer');
      newContainer.style.visibility = 'hidden';

fakeParent.appendChild(oldContainer);
fakeParent.appendChild(newContainer);

const newContainerPromise = new Promise((resolve, reject) => {
  resolve(newContainer);
});

const baseInstance = new Barba.BaseTransition();

it('has default members', () => {
  expect(baseInstance.oldContainer).toBeFalsy();
  expect(baseInstance.newContainer).toBeFalsy();
  expect(baseInstance.newContainerLoading).toBeFalsy();
  expect(typeof baseInstance.start).toBe('function');
});

it('can init', () => {
  let promise = baseInstance.init(oldContainer, newContainerPromise);
  expect(typeof promise.then).toBe('function');

  baseInstance.newContainerLoading.then((container) => {
    expect(baseInstance.newContainer).toBe(newContainer);
  });
});

it('can finish', () => {
  expect(newContainer.style.visibility).toBe('hidden');

  baseInstance.newContainerLoading.then(() => {
    baseInstance.done();

    expect(fakeParent.querySelector('.oldcontainer')).toBeFalsy();
    expect(newContainer.style.visibility).toBe('visible');
  });
})
