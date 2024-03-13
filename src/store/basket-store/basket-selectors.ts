import { createSelector } from '@reduxjs/toolkit';
import { NameSpace } from '../../consts';
import { State } from '../../types/store';

const getBasketList = createSelector([(state: Pick<State, NameSpace.Basket>) => state[NameSpace.Basket]], (state) => {
  const basketList = state.basketList;
  return basketList;
});

const getBasketRemoveItem = (state: Pick<State, NameSpace.Basket>) => state[NameSpace.Basket].setBasketRemoveItem;
const getCouponSendingStatus = (state: Pick<State, NameSpace.Basket>) => state[NameSpace.Basket].couponSendingStatus;

const getDiscount = (state: Pick<State, NameSpace.Basket>) => state[NameSpace.Basket].discount / 100;

const getItemCount = (id: number) => (state: Pick<State, NameSpace.Basket>) => {
  const basketList = state[NameSpace.Basket].basketList;
  const result = basketList.find((camera) => camera.id === id)?.count || 0;
  return result;
};
const getTotalCount = createSelector([getBasketList], (basketList) => {
  const totalCount = basketList.reduce((sum, camera) => {
    const result = sum + camera.count;
    return result;
  }, 0);
  return totalCount;
});

const getTotalSum = createSelector([getBasketList], (basketList) => {
  const totalSum = basketList.reduce((sum, camera) => sum + (camera.price * camera.count), 0);
  return totalSum;
});


export {
  getBasketList,
  getCouponSendingStatus,
  getBasketRemoveItem,
  getDiscount,
  getItemCount,
  getTotalCount,
  getTotalSum,
};


