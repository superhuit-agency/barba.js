import Barba from '../src/index';

test('Barba global namespace exists', () => {
  expect(typeof Barba).toBe('object');
});

test('all the components are exposed', () => {
  expect(Barba.version).toBe('version-string');
  expect(typeof Barba.BaseTransition).toBe('function');
  expect(typeof Barba.BaseView).toBe('function');
  expect(typeof Barba.Cache).toBe('object');
  expect(typeof Barba.Dispatcher).toBe('object');
  expect(typeof Barba.HistoryManager).toBe('object');
  expect(typeof Barba.Pjax).toBe('object');
  expect(typeof Barba.Prefetch).toBe('object');
  expect(typeof Barba.Utils).toBe('object');
});
