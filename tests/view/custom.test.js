import Barba from '../../src/index';

document.body.innerHTML = `
  <div id="barba-wrapper">
    <div class="barba-container" data-namespace="home">
      Yo.
    </div>
  </div>
`;

class Home extends Barba.View {
  constructor() {
    super();
    this.namespace = 'home';
  }

  onEnter() {
    this.container.classList.add('entered');
  }

  onEnterCompleted() {

  }

  onLeave() {

  }

  onLeaveCompleted() {

  }
}

class Contact extends Barba.View {
  constructor() {
    super();
    this.namespace = 'contact';
  }

  onEnter() {

  }

  onEnterCompleted() {

  }

  onLeave() {

  }

  onLeaveCompleted() {

  }
}

let i = new Home();

it('exists', () => {
  expect(i instanceof Home).toBeTruthy();
  expect(i instanceof Barba.View).toBeTruthy();
});

it('events', () => {
  i.init();
  Barba.Pjax.start();

  expect(i.container.classList.contains('entered')).toBeTruthy();
});
