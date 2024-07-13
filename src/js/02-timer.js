import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
let selectedDate = null;
let currentDate = null;
let intervalId = null;


const refs = {
  dateTimePicker: document.querySelector('input#datetime-picker'),
  buttonStartTimer: document.querySelector('button[data-start]'),
  daysDataTimer: document.querySelector('[data-days]'),
  hoursDataTimer: document.querySelector('[data-hours]'),
  minutesDataTimer: document.querySelector('[data-minutes]'),
  secondsDataTimer: document.querySelector('[data-seconds]'),
};

refs.buttonStartTimer.disabled = true;

refs.buttonStartTimer.addEventListener('click', startTimer);


let remainingTime = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    onDateCheck(selectedDates);
  },
};

flatpickr(refs.dateTimePicker, options);

function onDateCheck(selectedDates) {
  selectedDate = selectedDates[0].getTime();
  currentDate = new Date().getTime();

  if (selectedDate > currentDate) {
    refs.buttonStartTimer.disabled = false;
    return;
  }
  window.alert('Please choose a date in the future');
}

function startTimer() {
  intervalId = setInterval(() => {
    currentDate = new Date().getTime();
    if (selectedDate - currentDate <= 1000) {
      clearInterval(intervalId);
      refs.buttonStartTimer.disabled = true;
      refs.dateTimePicker.disabled = false;
      return;
    } else {
      refs.buttonStartTimer.disabled = true;
      refs.dateTimePicker.disabled = true;
      currentDate += 1000;
      remainingTime = Math.floor(selectedDate - currentDate);
      convertMs(remainingTime);
    }
  }, 1000);
}

function timePad(value) {
  return String(value).padStart(2, '0');
}

function createMarkup({ days, hours, minutes, seconds }) {
  refs.daysDataTimer.textContent = days;
  refs.hoursDataTimer.textContent = hours;
  refs.minutesDataTimer.textContent = minutes;
  refs.secondsDataTimer.textContent = seconds;
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = timePad(Math.floor(ms / day));

  const hours = timePad(Math.floor((ms % day) / hour));

  const minutes = timePad(Math.floor(((ms % day) % hour) / minute));

  const seconds = timePad(Math.floor((((ms % day) % hour) % minute) / second));
  createMarkup({ days, hours, minutes, seconds });
  return { days, hours, minutes, seconds };
}
