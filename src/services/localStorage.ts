import { LoadingDataStatus } from '../consts';
import { TBasketCard, TCouponResponse } from '../types/general-types';

const BASKET_DATA_KEY_NAME = 'basket-data';
const DISCOUNT_KEY_NAME = 'discount';
const COUPON_KEY_NAME = 'couponValue';
const COUPON_STATUS_KEY_NAME = 'couponStatus';

function saveBasketToStorage(data: TBasketCard[]) {
  localStorage.setItem(BASKET_DATA_KEY_NAME, JSON.stringify(data));
}
function getBasketFromStorage(): TBasketCard[] {
  const basketData = localStorage.getItem(BASKET_DATA_KEY_NAME);
  if (!basketData) {
    return [];
  }
  return JSON.parse(basketData) as TBasketCard[];
}

function saveDiscountToStorage(discount: number) {
  localStorage.setItem(DISCOUNT_KEY_NAME, JSON.stringify(discount));
}
function getDiscountFromStorage() {
  const discount = localStorage.getItem(DISCOUNT_KEY_NAME);
  if (!discount) {
    return 0;
  }
  return JSON.parse(discount) as TCouponResponse;
}


function saveCouponValueToStorage(coupon: string) {
  localStorage.setItem(COUPON_KEY_NAME, JSON.stringify(coupon));
}
function getCouponValueFromStorage() {
  const coupon = localStorage.getItem(COUPON_KEY_NAME);

  if (!coupon) {
    return '';
  }
  return JSON.parse(coupon) as string;
}

function saveCouponSendingStatusToStorage(status: LoadingDataStatus) {
  localStorage.setItem(COUPON_STATUS_KEY_NAME, JSON.stringify(status));
}
function getCouponSendingStatusFromStorage() {
  const status = localStorage.getItem(COUPON_STATUS_KEY_NAME);
  if (!status) {
    return LoadingDataStatus.Unsent;
  }

  return JSON.parse(status) as LoadingDataStatus;
}


export {
  getBasketFromStorage,
  saveBasketToStorage,

  getDiscountFromStorage,
  saveDiscountToStorage,

  getCouponValueFromStorage,
  saveCouponValueToStorage,

  saveCouponSendingStatusToStorage,
  getCouponSendingStatusFromStorage,
};
