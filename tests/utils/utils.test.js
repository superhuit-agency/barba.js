import Barba from '../../src/index';
const fetchMock = require('fetch-mock');

function Headers() {
  this.append = () => {};
}

global.Headers = Headers;

const utils = Barba.Utils;

it('can get current url', () => {
  expect(utils.getCurrentUrl()).toBe('about://blank');

  Object.defineProperty(window.location, 'protocol', {
    writable: true,
    value: 'http:'
  });

  Object.defineProperty(window.location, 'host', {
    writable: true,
    value: 'luruke.com'
  });

  Object.defineProperty(window.location, 'pathname', {
    writable: true,
    value: '/dir'
  });

  Object.defineProperty(window.location, 'search', {
    writable: true,
    value: '?test'
  });

  expect(utils.getCurrentUrl()).toBe('http://luruke.com/dir?test');
});

it('can clean link', () => {
  let tests = {
    'http://luruke.com/' : 'http://luruke.com/',
    'http://luruke.com/index.html?test' : 'http://luruke.com/index.html?test',
    'http://luruke.com/index.html?#test' : 'http://luruke.com/index.html?',
    'http://luruke.com/#test' : 'http://luruke.com/',
    'http://luruke.com/#test?sdfsdf' : 'http://luruke.com/',
    'index.html' : 'index.html',
    'index.html#hello' : 'index.html',
    'index.html#hello.html' : 'index.html'
  };

  for (let i in tests) {
    expect(utils.cleanLink(i)).toBe(tests[i]);
  }
});

it('has xhrTimeout', () => {
  expect(utils.xhrTimeout).toBe(5000);
});

it('can fetch', () => {

  fetchMock.get('success', {
    body: 'a string',
    status: 200
  });

  fetchMock.get('partial', {
    body: 'a partial',
    status: 206
  });

  fetchMock.get('notfound', {
    body: 'notfound',
    status: 404
  });

  fetchMock.get('error', {
    throws: 'error'
  });

  utils.xhr('success').then(text => {
    expect(text).toBe('a string');
  });

  utils.xhr('partial').then(text => {
    expect(text).toBe('a partial');
  });

  utils.xhr('notfound').catch(res => {
    expect(res).toBeTruthy();
  });

  utils.xhr('error').catch(res => {
    expect(res).toBeTruthy();
  });
});

it('has deferred', () => {
  let dfd = new utils.deferred();
  let dfd2 = new utils.deferred();

  expect(typeof dfd).toBe('object');
  expect(typeof dfd.promise).toBe('object');
  expect(typeof dfd.resolve).toBe('function');
  expect(typeof dfd.reject).toBe('function');

  dfd.promise.then((string) => {
    expect(string).toBe('test');
  });

  dfd.resolve('test');

  dfd2.promise.then().catch((err) => {
    expect(err).toBe('error');
  });

  dfd2.reject('error');
});

it('has .getPort', () => {
  Object.defineProperty(window.location, 'port', {
    writable: true,
    value: '80'
  });

  Object.defineProperty(window.location, 'protocol', {
    writable: true,
    value: 'http:'
  });

  expect(utils.getPort()).toBe(80);
  expect(utils.getPort('')).toBe(80);

  window.location.protocol = 'https:';
  expect(utils.getPort('')).toBe(443);
});
