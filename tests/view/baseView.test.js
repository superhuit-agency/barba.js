import Barba from '../../src/index';

const view = Barba.BaseView;

it('exists', () => {
  expect(typeof view).toBe('function');

  let i = new view();

  expect(typeof i.init).toBe('function');
  expect(typeof i.onEnter).toBe('function');
  expect(typeof i.onEnterCompleted).toBe('function');
  expect(typeof i.onLeave).toBe('function');

  i.onEnter();
  i.onEnterCompleted();
  i.onLeave();
  i.onLeaveCompleted();
});
