document.body.innerHTML = `
  <div id="main-wrapper" class="sitewrapper">
    <div class="container" data-id="home">
      <a href="contact.html" class="contact">Contact</a>
      <a href="about.html" class="about">About</a>
      <a href="about.html" class="test"><p>test</p></a>
      <a href="make.html" class="make no-barba-prefetch">make</a>
    </div>
  </div>
`;

const fetchMock = require('fetch-mock');

function Headers() {
  this.append = () => {};
}
global.Headers = Headers;

fetchMock.get('contact.html', {
  body: 'contact',
  status: 200
});

fetchMock.get('about.html', {
  body: 'about',
  status: 200
});

import Barba from '../../src/index';
const prefetch = Barba.Prefetch;
const cache = Barba.Cache;

it('has ignoreClassLink', () => {
  expect(prefetch.ignoreClassLink).toBe('no-barba-prefetch');
});

it('has init', () => {
  expect(typeof prefetch.init).toBe('function');
  prefetch.init();
});

it('has mouseover', () => {
  const mouse = new Event('mouseover');
  var contact = document.querySelector('.contact');

  Object.defineProperty(contact, 'protocol', {
    writable: true,
    value: 'about:'
  });

  Object.defineProperty(mouse, 'target', {
    writable: true,
    value: contact
  });

  document.body.dispatchEvent(mouse);

  cache.get('contact.html').then((content) => {
    expect(content).toBe('contact');
  });
});

it('has touchstart', () => {
  const mouse = new Event('touchstart');
  var about = document.querySelector('.about');

  Object.defineProperty(about, 'protocol', {
    writable: true,
    value: 'about:'
  });

  Object.defineProperty(mouse, 'target', {
    writable: true,
    value: about
  });

  document.body.dispatchEvent(mouse);

  cache.get('about.html').then((content) => {
    expect(content).toBe('about');
  });
});

it('trigger on child', () => {
  const mouse = new Event('mouseover');
  var testp = document.querySelector('.test p');

  Object.defineProperty(testp, 'protocol', {
    writable: true,
    value: 'about:'
  });

  Object.defineProperty(mouse, 'target', {
    writable: true,
    value: testp
  });

  document.body.dispatchEvent(mouse);

  cache.get('about.html').then((content) => {
    expect(content).toBe('about');
  });
});

it('Make', () => {
  const mouse = new Event('mouseover');
  var make = document.querySelector('.make');

  Object.defineProperty(make, 'protocol', {
    writable: true,
    value: 'about:'
  });

  Object.defineProperty(mouse, 'target', {
    writable: true,
    value: make
  });

  document.body.dispatchEvent(mouse);

  expect(cache.get('make.html')).toBeFalsy();
});
