import { createSelector } from '@reduxjs/toolkit';
import { NameSpace } from '../../consts';
import { State } from '../../types/store';

const getBasketList = createSelector([(state: Pick<State, NameSpace.Basket>) => state[NameSpace.Basket]], (state) => {
  const basketList = state.basketList;
  return basketList;
});

const getTotalCount = createSelector([getBasketList], (basketList) => {
  const totalCount = basketList.reduce((sum, camera) => {
    const result = sum + camera.count;
    return result;
  }, 0);
  return totalCount;
});

const getItemCount = (id: number) => (state: Pick<State, NameSpace.Basket>) => {
  const basketList = state[NameSpace.Basket].basketList;
  const result = basketList.find((camera) => camera.id === id)?.count || 0;
  return result;
};

const getBasketRemoveItem = (state: Pick<State, NameSpace.Basket>) => state[NameSpace.Basket].setBasketRemoveItem;


export {
  getBasketList,

  getTotalCount,
  getItemCount,

  getBasketRemoveItem,
};


