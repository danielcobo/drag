/**
 * Check if element matches any selector in index
 * @param {HTMLElement} element
 * @param {object} index - has selectors for keys
 * @return {boolean} - true/false if element matches any selector in index
 */
const matchIndex = function matchIndex(element, index) {
  if (element.nodeName === '#document') {
    return true;
  }
  for (key in index) {
    if (element.matches(key)) {
      return true;
    }
  }
  return false;
};

/**
 * Dispatch dragStart event
 * @param {Event} e - pointerdown event
 */
const dragStart = function dragStart(e) {
  if (matchIndex(e.target, data.on)) {
    data.target = e.target;
    data.start = { x: e.pageX, y: e.pageY };
    let $parent;
    if (
      data.target.nodeName === '#document' ||
      data.target.nodeName === 'HTML'
    ) {
      $parent = document.querySelector('body');
    } else {
      $parent = data.target.parentElement;
    }

    data.parent = {
      x: $parent.getBoundingClientRect().left + window.scrollX,
      y: $parent.getBoundingClientRect().top + window.scrollY,
    };

    document.addEventListener('pointermove', dragMove);
    document.addEventListener('pointerup', dragStop);

    const event = new CustomEvent('dragStart', { detail: data });
    document.dispatchEvent(event);
  }
};

/**
 * Dispatch dragMove event
 * @param {Event} e - pointermove event
 */
const dragMove = function dragMove(e) {
  data.now = { x: e.pageX, y: e.pageY };
  data.diff = {
    x: data.start.x - data.now.x,
    y: data.start.y - data.now.y,
  };

  const event = new CustomEvent('dragMove', { detail: data });
  document.dispatchEvent(event);
};

/**
 * Dispatch dragStop event
 * @param {Event} e - pointerstop event
 */
const dragStop = function dragStop(e) {
  data.now = { x: e.pageX, y: e.pageY };
  data.diff = {
    x: data.start.x - data.now.x,
    y: data.start.y - data.now.y,
  };

  document.removeEventListener('pointermove', dragMove);
  document.removeEventListener('pointerup', dragStop);

  const event = new CustomEvent('dragStop', { detail: data });
  document.dispatchEvent(event);
};

const data = { on: {} };
document.addEventListener('pointerdown', dragStart);
const drag = {};

/**
 * @public
 * Enable drag events on given element/s
 * @param {string} selector
 */
drag.on = function dragOn(selector) {
  data.on[selector] = true;
};

/**
 * @public
 * Disable drag events on given element/s
 * @param {string} selector
 */
drag.off = function dragOff(selector) {
  delete data.on[selector];
};

module.exports = drag;
