import dayjs from 'dayjs';
import 'dayjs/locale/ru';

function convertDateInMs(value: string) {
  return Date.parse(value);
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
  formatDate,
  formatPrice,
  pickRandomElement,
};
