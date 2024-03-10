import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TBasketCard, TSelectedCard } from '../../types/general-types';
import { NameSpace } from '../../consts';

type TBasketState = {
  basketList: TBasketCard[];
}
const initialState: TBasketState = {
  basketList: [],
};
const basketSlice = createSlice({
  name: NameSpace.Basket,
  initialState,
  reducers: {

    addItemToBasketList: (state, action: PayloadAction<TSelectedCard>) => {
      let isInList = false;
      const payloadCameraId = action.payload.id;
      const index = state.basketList.findIndex((camera) => camera.id === payloadCameraId);

      isInList = index >= 0;
      if (!isInList) {
        const item = {
          ...action.payload,
          count: 1,
        };
        state.basketList.push(item);
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
      state.basketList[index].count -= action.payload.count;
    },
    incrementBasketItem: (state, action: PayloadAction<{ id: TBasketCard['id']; count: number }>) => {
      const index = state.basketList.findIndex((camera) => camera.id === action.payload.id);
      state.basketList[index].count += action.payload.count;
    },
    setItemCount: (state, action: PayloadAction<{ id: TBasketCard['id']; count: string }>) => {
      const formatedCount = Number(action.payload.count);

      const index = state.basketList.findIndex((camera) => camera.id === action.payload.id);
      state.basketList[index].count = formatedCount;
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
