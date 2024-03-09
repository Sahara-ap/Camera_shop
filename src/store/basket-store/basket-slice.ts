import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TBasketCard, TSelectedCard } from '../../types/general-types';
import { NameSpace } from '../../consts';
import { BasketList } from '../../components/basket-list/basket-list';

type TBasketState = {
  basketList: TBasketCard[];
  // basketIdList: number[];
}
const initialState: TBasketState = {
  basketList: [],
  // basketIdList: [],
};
const basketSlice = createSlice({
  name: NameSpace.Basket,
  initialState,
  reducers: {
    // addIdToBasketList: (state, action: PayloadAction<number>) => {
    //   state.basketIdList.push(action.payload);
    // },
    // addItemToBasketList: (state, action: PayloadAction<TSelectedCard>) => {
    //   state.basketList.push(action.payload);
    // },
    addItemToBasketList: (state, action: PayloadAction<TSelectedCard>) => {
      //TODO: необходимо расширить консерву camera полями totalPrice и count
      // state.basketIdList.push(action.payload.id); // добавляем id при каждом клике user на кнопку купить

      let isInList = false;
      const payloadCameraId = action.payload.id;
      // state.basketList.forEach((camera) => {
      //   if (camera.id === payloadCameraId) {
      //     isInList = true;
      //   }
      // });
      const index = state.basketList.findIndex((camera) => camera.id === payloadCameraId);
      isInList = index >= 0;


      //получим только уникальные объекты внутри basketList
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
    // decrementBasketItem: (state, action: PayloadAction<TBasketCard['id']>) => {
    //   const payloadCameraId = action.payload;
    //   const index = state.basketList.findLastIndex((camera) => camera.id === payloadCameraId);
    //   state.basketList.splice(index, 1);
    // },
    decrementBasketItem: (state, action: PayloadAction<{id: TBasketCard['id']; count: number}>) => {
      const index = state.basketList.findIndex((camera) => camera.id === action.payload.id);
      state.basketList[index].count -= action.payload.count;
    },
    incrementBasketItem: (state, action: PayloadAction<{id: TBasketCard['id']; count: number}>) => {
      const index = state.basketList.findIndex((camera) => camera.id === action.payload.id);
      state.basketList[index].count += action.payload.count;
      // state.basketList.push(action.payload);
    }
  }
});

const { addIdToBasketList, addItemToBasketList, dropBasketList, deleteBasketItem, decrementBasketItem, incrementBasketItem } = basketSlice.actions;

export {
  basketSlice,

  addIdToBasketList,
  addItemToBasketList,
  dropBasketList,
  deleteBasketItem,
  decrementBasketItem,
  incrementBasketItem,
};
