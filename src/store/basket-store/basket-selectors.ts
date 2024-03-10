import { createSelector } from '@reduxjs/toolkit';
import { NameSpace } from '../../consts';
import { State } from '../../types/store';
import { TBasketCard } from '../../types/general-types';

const getBasketList = createSelector([(state: Pick<State, NameSpace.Basket>) => state[NameSpace.Basket]], (state) => {
  const basketList = state.basketList;
  const basketListWithoutNullOfCount = basketList.filter((camera: TBasketCard) => camera.count !== 0);
  return basketListWithoutNullOfCount;
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


export {
  getBasketList,

  getTotalCount,
  getItemCount,
};


