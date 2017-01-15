import Barba from '../../src/index';

const cache = Barba.Cache;

const getSizeData = function() {
  return Object.keys(cache.data).length;
}

test('is possible to set a value', () => {
  expect(typeof cache.data).toBe('object');
  expect(getSizeData()).toBe(0);
  cache.set('test', 1);
  expect(getSizeData()).toBe(1);
  cache.set('stringTest', 'stringyeah');
  expect(getSizeData()).toBe(2);
});

test('is possible to get a value', () => {
  expect(cache.get('test')).toBe(1);
  expect(cache.get('stringTest')).toBe('stringyeah');
});

test('is possible to reset the cache', () => {
  expect(getSizeData()).toBe(2);
  cache.reset();
  expect(getSizeData()).toBe(0);
});
