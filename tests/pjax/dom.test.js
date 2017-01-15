const html = `
<html>
  <head>
    <title>MyTitle</title>
  </head>
  <body>
    <div id="main-wrapper">
      <div class="container" data-id="home">
        Yo.
      </div>
    </div>
  </body>
</html>
`;

// document.body.innerHTML = html;

import Barba from '../../src/index';
const dom = Barba.Pjax.Dom;

it('has dataNamespace', () => {
  expect(dom.dataNamespace).toBe('namespace');
  dom.dataNamespace = 'id';
});

it('has wrapperId', () => {
  expect(dom.wrapperId).toBe('barba-wrapper');
  dom.wrapperId = 'main-wrapper';
});

it('has containerClass', () => {
  expect(dom.containerClass).toBe('barba-container');
  dom.containerClass = 'container';
});

it('has currentHTML', () => {
  expect(dom.currentHTML).toBe('<head></head><body></body>');
});

it('can parse response', () => {
  let container = dom.parseResponse(html);

  expect(document.title).toBe('MyTitle');
  expect(container.getAttribute('data-id')).toBe('home');
  expect(container.getAttribute('class')).toBe('container');
});

it('can get the current wrapper', () => {
  expect(dom.getWrapper.bind(dom)).toThrowError('Barba.js: wrapper not found!');

  document.body.innerHTML = `
    <div id="main-wrapper" class="sitewrapper">
      <div class="container" data-id="home">
        Yo.
      </div>
    </div>
  `;

  expect(dom.getWrapper().getAttribute('class')).toBe('sitewrapper');
});

it('can get the container', () => {
  // Not sure how to do this..
  // const old = document.body.innerHTML;
  // document.body = undefined;

  // expect(dom.getContainer.bind(dom)).toThrowError('Barba.js: DOM not ready!');

  expect(dom.getContainer().getAttribute('class')).toBe('container');

  let element = document.createElement('div');
  element.innerHTML = `<div class="container" data-test="true"></div>`;
  expect(dom.getContainer(element).getAttribute('data-test')).toBe('true');

  element.innerHTML = `<div data-test="true"></div>`;
  expect(dom.getContainer.bind(dom, element)).toThrowError('Barba.js: no container found');
});

it('can get the namespace', () => {
  expect(dom.getNamespace()).toBeFalsy();

  let element = document.createElement('div');
  element.setAttribute('data-id', 'mynamespace');

  expect(dom.getNamespace(element)).toBe('mynamespace');
});

it('can put the container', () => {
  document.body.innerHTML = `
    <div id="main-wrapper" class="sitewrapper">
      <div class="container" data-id="home">
        Yo.
      </div>
    </div>
  `;

  let element = document.createElement('div');
  element.setAttribute('data-id', 'contact');
  element.setAttribute('class', 'container');
  element.innerHTML = 'content!';

  expect(document.querySelectorAll('.container').length).toBe(1);
  dom.putContainer(element);

  expect(element.style.visibility).toBe('hidden');
  expect(document.querySelectorAll('.container').length).toBe(2);
});
