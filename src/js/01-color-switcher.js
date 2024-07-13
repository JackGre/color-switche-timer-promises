const CHANGE_COLOR_DELAY = 1000;
let intervalColor = null;
const refs = {
  buttonStart: document.querySelector('[data-start]'),
  buttonStop: document.querySelector('[data-stop]'),
  body: document.querySelector('body'),
};

// const buttonStart = document.querySelector('[data-start]');
// const buttonStop = document.querySelector('[data-stop]');

refs.buttonStart.addEventListener('click', onClickColorSwitcherStart);
refs.buttonStop.addEventListener('click', onClickColorSwitcherStop);

refs.buttonStop.disabled = true;

function onClickColorSwitcherStart() {
  refs.buttonStart.disabled = true;
  refs.buttonStop.disabled = false;

  intervalColor = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
  }, CHANGE_COLOR_DELAY);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

function onClickColorSwitcherStop() {
  clearInterval(intervalColor);
  refs.buttonStart.disabled = false;
  refs.buttonStop.disabled = true;
}
