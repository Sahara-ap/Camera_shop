import { createSelector } from '@reduxjs/toolkit';
import { NameSpace } from '../../consts';
import { State } from '../../types/store';

const getBasketList = (state: Pick<State, NameSpace.Basket>) => state[NameSpace.Basket].basketList;
const getBasketListId = createSelector([getBasketList], (basketList) => {
  const idList = basketList.map((item) => item.id);
  return idList;
});
const getBasketCount = createSelector([getBasketList], (basketList) => basketList.length);

export {
  getBasketList,
  getBasketListId,
  getBasketCount,
};
