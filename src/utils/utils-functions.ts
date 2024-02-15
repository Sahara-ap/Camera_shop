import dayjs from 'dayjs';
import 'dayjs/locale/ru';

function convertDateInMs(value: string) {
  return Date.parse(value);
}


function disableScrollLock() {
  document.body.classList.remove('scroll-lock');
}
function enableScrollLock() {
  document.body.classList.add('scroll-lock');
}


function formatDate(value: dayjs.ConfigType): string {
  dayjs.locale('ru');
  return dayjs(value, 'ru').format('DD MMMM');
}

function formatPrice(value: number) {
  return value.toLocaleString('ru');
}

function pickRandomElement<T>(items:T[]) {
  const randomIndex = Math.floor(Math.random() * items.length);
  return items[randomIndex];
}


export {
  convertDateInMs,

  disableScrollLock,
  enableScrollLock,

  formatDate,
  formatPrice,
  pickRandomElement,

};
