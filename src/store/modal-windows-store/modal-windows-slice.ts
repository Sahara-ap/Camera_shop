import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../consts';
import { TSelectedCard } from '../../types/generalTypes';

type TModalWindowsState = {
  isBuyProductActive: boolean;
  productData: TSelectedCard | null;
}
const initialState: TModalWindowsState = {
  isBuyProductActive: false,
  productData: null
};

const modalWindowsSlice = createSlice({
  name: NameSpace.Modals,
  initialState,
  reducers: {
    setIsBuyProductActive: (state, action: PayloadAction<boolean>) => {
      state.isBuyProductActive = action.payload;
    },
  }
});

const {setIsBuyProductActive} = modalWindowsSlice.actions;

export {
  modalWindowsSlice,

  setIsBuyProductActive,
};
