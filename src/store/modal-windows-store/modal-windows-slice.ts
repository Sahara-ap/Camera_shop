import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../consts';

type TModalWindowsState = {
  isBuyProductActive: boolean;
}
const initialState: TModalWindowsState = {
  isBuyProductActive: false
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
