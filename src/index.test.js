/**
 * @jest-environment jsdom
 */
const drag = require('./index.js');

document.body.innerHTML = `
  <div>
    <p>Hello <span>world</span></p>
  </div>
 `;

drag.on('p');
test('dragStart', function () {
  let eventFired = false;
  document.addEventListener('dragStart', function () {
    eventFired = true;
  });
  const e = new Event('pointerdown', { bubbles: true });
  document.querySelector('p').dispatchEvent(e);
  expect(eventFired).toStrictEqual(true);
});

test('no dragStart', function () {
  let eventFired = false;
  document.addEventListener('dragStart', function () {
    eventFired = true;
  });
  const e = new Event('pointerdown', { bubbles: true });
  document.querySelector('span').dispatchEvent(e);
  expect(eventFired).toStrictEqual(false);
});

test('dragMove', function () {
  let eventFired = false;
  document.addEventListener('dragMove', function (e) {
    eventFired = true;
  });
  const e = new Event('pointermove', { bubbles: true });
  document.querySelector('p').dispatchEvent(e);
  expect(eventFired).toStrictEqual(true);
});

test('dragStop', function () {
  let eventFired = false;
  document.addEventListener('dragStop', function () {
    eventFired = true;
  });
  const e = new Event('pointerup', { bubbles: true });
  document.querySelector('p').dispatchEvent(e);
  expect(eventFired).toStrictEqual(true);
});

test('drag.off', function () {
  drag.off('p');
  let eventFired = false;
  document.addEventListener('dragStart', function (e) {
    eventFired = true;
  });
  const e = new Event('pointerdown', { bubbles: true });
  document.querySelector('p').dispatchEvent(e);
  expect(eventFired).toStrictEqual(false);
});

drag.on('document');
test('document', function () {
  let eventFired = false;
  document.addEventListener('dragStart', function () {
    eventFired = true;
  });
  const e = new Event('pointerdown', { bubbles: true });
  document.dispatchEvent(e);
  expect(eventFired).toStrictEqual(true);
});

drag.on('html');
test('html', function () {
  let eventFired = false;
  document.addEventListener('dragStart', function () {
    eventFired = true;
  });
  const e = new Event('pointerdown', { bubbles: true });
  document.querySelector('html').dispatchEvent(e);
  expect(eventFired).toStrictEqual(true);
});

//TO-DO: Add tests for data in e.detail
