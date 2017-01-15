import Barba from '../../src/index';

const disp = Barba.Dispatcher;

let name = 'mario';
let clb = jest.fn();
let clb2 = jest.fn();

test('is possible to add a listener', () => {
  expect(Object.keys(disp.events).length).toBe(0);
  disp.on('sbam', clb);

  expect(Object.keys(disp.events).length).toBe(1);
  expect(typeof disp.events.sbam).toBe('object');
  expect(disp.events.sbam.length).toBe(1);
  expect(disp.events.sbam).toContain(clb);

  disp.on('sbam', clb2);
  expect(disp.events.sbam.length).toBe(2);
});

test('is possible to trigger an event', () => {
  disp.trigger('sbam');
  expect(clb).toHaveBeenCalled();
  expect(clb2).toHaveBeenCalled();
  disp.trigger('donotexists');

  expect(name).toBe('mario');
  disp.once('setname', (newname) => {
    name = newname;
  });

  expect(disp.events.setname.length).toBe(1);
  disp.trigger('setname', 'luigi');
  expect(disp.events.setname.length).toBe(0);
  expect(name).toBe('luigi');
  disp.trigger('setname', 'yoshi');
  expect(name).toBe('luigi');
});

test('is possible to remove a listener', () => {
  disp.off('sbam', clb);
  expect(disp.events.sbam.length).toBe(1);
  disp.off('sbam', clb2);
  expect(disp.events.sbam.length).toBe(0);

  disp.off('notexist', clb2);
});
