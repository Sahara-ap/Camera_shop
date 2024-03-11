import { TBasketCard } from '../types/general-types';

const BASKET_DATA_KEY_NAME = 'basket-data';

function getFromStorage(): TBasketCard[] {
  const basketData = localStorage.getItem(BASKET_DATA_KEY_NAME);
  if (!basketData) {
    return [];
  }
  return JSON.parse(basketData) as TBasketCard[];
}

function saveToStorage(data: TBasketCard[]) {
  localStorage.setItem(BASKET_DATA_KEY_NAME, JSON.stringify(data));

}

export {
  getFromStorage,
  saveToStorage,
};
