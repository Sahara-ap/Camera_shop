import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../consts';
import { TSelectedCard } from '../../types/general-types';

type TModalWindowsState = {
  isBuyProductActive: boolean;
  productData: TSelectedCard | null;

  isAddProductToCartSuccess: boolean;

  isReviewModalActive: boolean;
  isReviewModalSuccessActive: boolean;
}
const initialState: TModalWindowsState = {
  isBuyProductActive: false,
  productData: null,

  isAddProductToCartSuccess: false,

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

    setIsReviewModalActive: (state, action: PayloadAction<boolean>) => {
      state.isReviewModalActive = action.payload;
    },
    setIsReviewModalSuccessActive: (state, action: PayloadAction<boolean>) => {
      state.isReviewModalSuccessActive = action.payload;
    },
  }
});

const {setIsBuyProductActive, setIsAddProductToCartSuccess, setIsReviewModalActive, setIsReviewModalSuccessActive} = modalWindowsSlice.actions;

export {
  modalWindowsSlice,

  setIsBuyProductActive,
  setIsAddProductToCartSuccess,
  setIsReviewModalActive,
  setIsReviewModalSuccessActive,
};
