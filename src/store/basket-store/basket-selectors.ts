import { createSelector } from '@reduxjs/toolkit';
import { NameSpace } from '../../consts';
import { State } from '../../types/store';
import { TSelectedCard } from '../../types/general-types';

const getBasketList = (state: Pick<State, NameSpace.Basket>) => state[NameSpace.Basket].basketList;
const getBasketListId = createSelector([getBasketList], (basketList) => {
  const idList = basketList.map((item) => item.id);
  return idList;
});
const getBasketCount = createSelector([getBasketList], (basketList) => basketList.length);

const getBasketListWithUniqueItems = createSelector([getBasketList, getBasketListId], (basketList, ids) => {
  // const uniqueIds = Array.from(new Set(ids));

  //сделаем счетчик айдишек
  const idCounter = ids.reduce<Record<string, number>>((acc, id) => {
    acc[id] = (acc[id] || 0) + 1;
    return acc;
  }, {});
  console.log('idCounter', idCounter);


  //сделаем уникальный массив камер
  const uniqueCameraList = [] as TSelectedCard[];
  basketList.forEach((camera) => {
    const isInList = Boolean(uniqueCameraList.find((item) => item.id === camera.id));
    if (!isInList) {
      uniqueCameraList.push(camera);
    }
  });

  //сделаем расширенный уникальный список камер
  const extendedUniqueCameraList = uniqueCameraList.map((camera) => (
    {
      ...camera,
      count: idCounter[camera.id],
      getTotalPrice() {
        return this.count * this.price;
      },
    }
  ));


  return extendedUniqueCameraList;
});
// const getBasketIds = (state: Pick<State, NameSpace.Basket>) => state[NameSpace.Basket].basketIdList;

export {
  getBasketList,
  getBasketListId,
  getBasketCount,

  getBasketListWithUniqueItems,
};
