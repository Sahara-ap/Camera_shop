import { TBasketCard, TCouponResponse } from '../types/general-types';

const BASKET_DATA_KEY_NAME = 'basket-data';
const DISCOUNT_KEY_NAME = 'discount';

function getBasketFromStorage(): TBasketCard[] {
  const basketData = localStorage.getItem(BASKET_DATA_KEY_NAME);
  if (!basketData) {
    return [];
  }
  return JSON.parse(basketData) as TBasketCard[];
}
function saveBasketToStorage(data: TBasketCard[]) {
  localStorage.setItem(BASKET_DATA_KEY_NAME, JSON.stringify(data));
}

function getDiscountFromStorage() {
  const discount = localStorage.getItem(DISCOUNT_KEY_NAME);
  if (!discount) {
    return 0;
  }
  return JSON.parse(discount) as TCouponResponse;
}
function saveDiscountToStorage(discount: number) {
  localStorage.setItem(DISCOUNT_KEY_NAME, JSON.stringify(discount));
}

export {
  getBasketFromStorage,
  saveBasketToStorage,
  getDiscountFromStorage,
  saveDiscountToStorage,
};
