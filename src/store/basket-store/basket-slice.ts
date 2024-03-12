/* eslint-disable no-useless-return */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TBasketCard, TSelectedCard } from '../../types/general-types';
import { NameSpace } from '../../consts';
import { getFromStorage } from '../../services/localStorage';

type TBasketState = {
  basketList: TBasketCard[];
}
const initialState: TBasketState = {
  basketList: getFromStorage(),
};
const basketSlice = createSlice({
  name: NameSpace.Basket,
  initialState,
  reducers: {

    addItemToBasketList: (state, action: PayloadAction<TSelectedCard>) => {
      const card = action.payload;
      const addCountFieldToCard = () => ({
        ...card,
        count: 1,
      });

      let isInList = false;
      const payloadCameraId = card.id;
      const index = state.basketList.findIndex((camera) => camera.id === payloadCameraId);

      isInList = index >= 0;
      if (!isInList) {
        const extendedCard = addCountFieldToCard();
        state.basketList.push(extendedCard);
      } else {
        state.basketList[index].count += 1;
      }
    },

    dropBasketList: (state) => {
      state.basketList = [];
    },
    deleteBasketItem: (state, action: PayloadAction<TBasketCard['id']>) => {
      const deletedCardId = action.payload;
      const result = state.basketList.filter((card) => card.id !== deletedCardId);
      state.basketList = result;
    },
    decrementBasketItem: (state, action: PayloadAction<{ id: TBasketCard['id']; count: number }>) => {
      const index = state.basketList.findIndex((camera) => camera.id === action.payload.id);
      const stateCount = state.basketList[index].count;
      if (stateCount === 1) {
        return;
      } else {
        state.basketList[index].count -= action.payload.count;
      }
    },
    incrementBasketItem: (state, action: PayloadAction<{ id: TBasketCard['id']; count: number }>) => {
      const index = state.basketList.findIndex((camera) => camera.id === action.payload.id);
      const stateCount = state.basketList[index].count;
      if (stateCount === 99) {
        return;
      } else {
        state.basketList[index].count += action.payload.count;
      }
    },
    setItemCount: (state, action: PayloadAction<{ id: TBasketCard['id']; count: string }>) => {
      const formatedCount = Number(action.payload.count);
      let result = formatedCount;
      if (formatedCount > 99) {
        result = 99;
      }
      if (formatedCount < 1) {
        result = 1;
      }

      const index = state.basketList.findIndex((camera) => camera.id === action.payload.id);
      state.basketList[index].count = result;
    }
  }
});

const { addItemToBasketList, dropBasketList, deleteBasketItem, decrementBasketItem, incrementBasketItem, setItemCount, } = basketSlice.actions;

export {
  basketSlice,

  addItemToBasketList,
  dropBasketList,
  deleteBasketItem,
  decrementBasketItem,
  incrementBasketItem,
  setItemCount,
};
