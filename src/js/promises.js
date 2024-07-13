import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('form.form'),
  delay: document.querySelector('[name="delay"]'),
  step: document.querySelector('[name="step"]'),
  amount: document.querySelector('[name="amount"]'),
};

refs.form.addEventListener('submit', onPromiseCreate);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function onPromiseCreate(e) {
  e.preventDefault(e);

  let firstDelay = Number(refs.delay.value);
  let delayStep = Number(refs.step.value);

  let amountNumber = Number(refs.amount.value);

  for (let i = 0; i <= amountNumber; i += 1) {
    let promiseDelay = firstDelay + delayStep * i;

    createPromise(i, promiseDelay).then(onFulfilled).catch(onError);
  }
}

function onFulfilled({ position, delay }) {
  Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
}

function onError({ position, delay }) {
  Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
}
