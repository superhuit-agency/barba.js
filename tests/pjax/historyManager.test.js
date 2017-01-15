import Barba from '../../src/index';
const history = Barba.HistoryManager;

it('has history', () => {
  expect(typeof history.history).toBe('object');
  expect(history.history.length).toBe(0);
});

it('can add history', () => {
  history.add('index.html', 'homepage');
  expect(history.history.length).toBe(1);

  history.add('contact.html');
  expect(history.history.length).toBe(2);
});

it('can get currentStatus', () => {
  let current = history.currentStatus();

  expect(typeof current).toBe('object');
  expect(current.url).toBe('contact.html');
  expect(current.namespace).toBeFalsy();
});

it('can get previous', () => {
  let prev = history.prevStatus();

  expect(typeof prev).toBe('object');
  expect(prev.url).toBe('index.html');
  expect(prev.namespace).toBe('homepage');

  history.history = [];
  prev = history.prevStatus();
  expect(prev).toBeFalsy();
});
