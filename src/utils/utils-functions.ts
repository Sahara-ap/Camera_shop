import dayjs from 'dayjs';
import 'dayjs/locale/ru';

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
  formatDate,
  formatPrice,
  pickRandomElement,
};
