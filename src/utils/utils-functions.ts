import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { TParamsCatalog } from '../types/general-types';

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

function formatPrice(value: number | undefined) {
  if (value) {
    return value.toLocaleString('ru');
  }
}

// function formatStringToNumber(value: string) {
//   if (value === '') {
//     return '';
//   }
//   const result = Number(value.trim().replace(/\s+/g, ''));
//   return result;
// }

// function format (value: string) {
//   if (value) {
//     const num = Number(value);
//     return num.toLocaleString('ru');
//   } else {
//     return '';
//   }
// }

function getParams(params: URLSearchParams): TParamsCatalog {
  return Object.fromEntries(params);
}

function pickRandomElement<T>(items: T[]) {
  const randomIndex = Math.floor(Math.random() * items.length);
  return items[randomIndex];
}

export {
  convertDateInMs,

  disableScrollLock,
  enableScrollLock,

  formatDate,
  formatPrice,
  formatStringToNumber,
  format,
  getParams,
  pickRandomElement,

};
