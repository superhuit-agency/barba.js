document.body.innerHTML = `
  <div id="barba-wrapper" class="sitewrapper">
    <div class="barba-container" data-namespace="home">
      Yo.
    </div>
  </div>
`;

const myWrapper = document.querySelector('#barba-wrapper');
const myContainer = document.querySelector('.barba-container');

import Barba from '../../src/index';
const dispatcher = Barba.Dispatcher;
const pjax = Barba.Pjax;


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

Object.defineProperty(window.location, 'hash', {
  writable: true,
  value: '?test'
});

it('has default stuff', () => {
  expect(typeof pjax.Dom).toBe('object');
  expect(typeof pjax.History).toBe('object');
  expect(typeof pjax.Cache).toBe('object');
  expect(pjax.cacheEnabled).toBeTruthy();
  expect(pjax.transitionProgress).toBeFalsy();
  expect(pjax.ignoreClassLink).toBe('no-barba');
});

it('can start', () => {
  let onInitStateChange = jest.fn();
  let onNewPageReady = jest.fn();
  let onTransitionCompleted = jest.fn();

  dispatcher.once('initStateChange', onInitStateChange);
  dispatcher.once('newPageReady', onNewPageReady);
  dispatcher.once('transitionCompleted', onTransitionCompleted);

  expect(typeof pjax.start).toBe('function');
  pjax.start(); //aka .init()

  expect(myWrapper.getAttribute('aria-live')).toBe('polite');

  // Check history
  const status = pjax.History.currentStatus();
  expect(status.url).toBe('http://luruke.com/dir?test');
  expect(status.namespace).toBe('home');

  // Check if events are fired
  expect(onInitStateChange).toHaveBeenCalledWith(status);
  expect(onNewPageReady).toHaveBeenCalledWith(status, {}, myContainer, '<head></head><body></body>');
  expect(onTransitionCompleted).toHaveBeenCalledWith(status);
});

// TODO
// it('has browser events binded', () => {
//   expect(1).toBe(1);
//   console.log(jsdom);
// });

it('can get current url', () => {
  expect(pjax.getCurrentUrl()).toBe('http://luruke.com/dir?test');
});

// it('can load an url', () => {
//   pjax.goTo('http://luruke.com/home');
// });


it('can get href', () => {
  var el1 = document.createElement('a');
      el1.href = 'http://google.com';

  var el2 = document.createElement('a');
      el2.href = 'https://mywebsite.com';

  var el3 = document.createElement('a');
      el3.href = '/internalpage';

  var el4 = document.createElement('a');
      el4.href = '#anchor';

  var el5 = document.createElement('a');
      el5.setAttribute('xlink:href', 'http://website.com');

  expect(pjax.getHref(el1)).toContain('http://google.com');
  expect(pjax.getHref(el2)).toContain('https://mywebsite.com');
  expect(pjax.getHref(el3)).toContain('/internalpage');
  expect(pjax.getHref(el4)).toContain('#anchor');
  expect(pjax.getHref(el5)).toContain('http://website.com');
});
