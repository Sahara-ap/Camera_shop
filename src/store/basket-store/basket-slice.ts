import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TSelectedCard } from '../../types/general-types';
import { NameSpace } from '../../consts';

type TBasketState = {
  basketList: TSelectedCard[];
  basketIdList: number[];
}
const initialState: TBasketState = {
  basketList: [],
  basketIdList: [],
};
const basketSlice = createSlice({
  name: NameSpace.Basket,
  initialState,
  reducers: {
    addIdToBasketList: (state, action: PayloadAction<number>) => {
      state.basketIdList.push(action.payload);
    },
    addItemToBasketList: (state, action: PayloadAction<TSelectedCard>) => {
      state.basketList.push(action.payload);
    },
    // addItemToBasketList: (state, action: PayloadAction<TSelectedCard>) => {
    //   //TODO: необходимо расширить консерву camera полями totalPrice и count
    //   state.basketIdList.push(action.payload.id); // добавляем id при каждом клике user на кнопку купить

    //   let isInList = false;
    //   const payloadCameraId = action.payload.id;
    //   state.basketList.forEach((camera) => {
    //     if (camera.id === payloadCameraId) {
    //       isInList = true;
    //     }
    //   });

    //   //получим только уникальные объекты внутри basketList
    //   if (!isInList) {
    //     state.basketList.push(action.payload);
    //   }
    // },

    dropBasketList: (state) => {
      state.basketList = [];
    },
    deleteBasketItem: (state, action: PayloadAction<TSelectedCard['id']>) => {
      const deletedCardId = action.payload;
      state.basketList.filter((card) => card.id !== deletedCardId);
    },
  }
});

const {addIdToBasketList, addItemToBasketList, dropBasketList, deleteBasketItem} = basketSlice.actions;

export {
  basketSlice,

  addIdToBasketList,
  addItemToBasketList,
  dropBasketList,
  deleteBasketItem,
};
