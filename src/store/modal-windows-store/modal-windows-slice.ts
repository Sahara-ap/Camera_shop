import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../consts';
import { TSelectedCard } from '../../types/generalTypes';

type TModalWindowsState = {
  isBuyProductActive: boolean;
  productData: TSelectedCard | null;

  isReviewModalActive: boolean;
  isReviewModalSuccessActive: boolean;
}
const initialState: TModalWindowsState = {
  isBuyProductActive: false,
  productData: null,

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
    setIsReviewModalActive: (state, action: PayloadAction<boolean>) => {
      state.isReviewModalActive = action.payload;
    },
    setIsReviewModalSuccessActive: (state, action: PayloadAction<boolean>) => {
      state.isReviewModalSuccessActive = action.payload;
    },
  }
});

const {setIsBuyProductActive, setIsReviewModalActive, setIsReviewModalSuccessActive} = modalWindowsSlice.actions;

export {
  modalWindowsSlice,

  setIsBuyProductActive,
  setIsReviewModalActive,
  setIsReviewModalSuccessActive,
};
