import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../consts';
import { TSelectedCard } from '../../types/general-types';

type TModalWindowsState = {
  isBuyProductActive: boolean;
  productData: TSelectedCard | null;

  isAddProductToCartSuccess: boolean;
  isRemoveFromBasketActive: boolean;

  isReviewModalActive: boolean;
  isReviewModalSuccessActive: boolean;
}
const initialState: TModalWindowsState = {
  isBuyProductActive: false,
  productData: null,

  isAddProductToCartSuccess: false,
  isRemoveFromBasketActive: false,

  isReviewModalActive: false,
  isReviewModalSuccessActive: false,
};

const modalWindowsSlice = createSlice({
  name: NameSpace.Modals,
  initialState,
  reducers: {
    setIsBuyProductActive: (state, action: PayloadAction<boolean>) => {
      state.isBuyProductActive = action.payload;
    },

    setIsAddProductToCartSuccess: (state, action: PayloadAction<boolean>) => {
      state.isAddProductToCartSuccess = action.payload;
    },
    setIsRemoveFromBasketActive: (state, action: PayloadAction<boolean>) => {
      state.isRemoveFromBasketActive = action.payload;
    },

    setIsReviewModalActive: (state, action: PayloadAction<boolean>) => {
      state.isReviewModalActive = action.payload;
    },
    setIsReviewModalSuccessActive: (state, action: PayloadAction<boolean>) => {
      state.isReviewModalSuccessActive = action.payload;
    },
  }
});

const {setIsBuyProductActive, setIsAddProductToCartSuccess, setIsRemoveFromBasketActive, setIsReviewModalActive, setIsReviewModalSuccessActive} = modalWindowsSlice.actions;

export {
  modalWindowsSlice,

  setIsAddProductToCartSuccess,
  setIsBuyProductActive,
  setIsRemoveFromBasketActive,
  setIsReviewModalActive,
  setIsReviewModalSuccessActive,
};
