import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TSelectedCard } from '../../types/general-types';
import { NameSpace } from '../../consts';

type TBasketState = {
  basketList: TSelectedCard[];
}
const initialState: TBasketState = {
  basketList: [],
};
const basketSlice = createSlice({
  name: NameSpace.Basket,
  initialState,
  reducers: {
    addItemToBasketList: (state, action: PayloadAction<TSelectedCard>) => {
      state.basketList.push(action.payload);
    },
    dropBasketList: (state) => {
      state.basketList = [];
    },
    deleteBasketItem: (state, action: PayloadAction<TSelectedCard['id']>) => {
      const deletedCardId = action.payload;
      state.basketList.filter((card) => card.id !== deletedCardId);
    },
  }
});

const {addItemToBasketList: addToBasketList, dropBasketList, deleteBasketItem} = basketSlice.actions;

export {
  basketSlice,

  addToBasketList,
  dropBasketList,
  deleteBasketItem,
};
