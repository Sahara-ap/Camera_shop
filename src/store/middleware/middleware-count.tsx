import { Middleware, PayloadAction } from '@reduxjs/toolkit';
import { saveToStorage } from '../../services/localStorage';
import { rootReducer } from '../root-reducer';
import { TBasketCard, TSelectedCard } from '../../types/general-types';
import { NameSpace } from '../../consts';

type Reducer = ReturnType<typeof rootReducer>

const middlewareLocalStorage: Middleware<unknown, Reducer> =
  (store) => (next) => (action: PayloadAction<TSelectedCard | TBasketCard[]>) => {

    if (action.type === 'BASKET/addItemToBasketList') {

      const card = action.payload as TSelectedCard;
      const basketList = structuredClone(store.getState()[NameSpace.Basket].basketList);
      const addCountFieldToCard = () => ({
        ...card,
        count: 1,
      });

      let isInList = false;
      const payloadCameraId = card.id;
      const index = basketList.findIndex((camera) => camera.id === payloadCameraId);

      isInList = index >= 0;
      if (!isInList) {
        const extendedCard = addCountFieldToCard();
        basketList.concat(extendedCard);
      } else {
        basketList[index].count += 1;
      }
      saveToStorage(basketList);
      action.payload = basketList;

    }
    return next(action);
  };

export {
  middlewareLocalStorage,
};
