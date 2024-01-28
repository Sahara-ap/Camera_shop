import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../consts';
import { fetchSelectedCameraAction } from '../api-actions/card-actions';
import { TSelectedCard } from '../../types/generalTypes';

type TSelectedCardState = {
  selectedCamera: TSelectedCard | null;
  isSelectedCameraLoading: boolean;
}

const initialState: TSelectedCardState = {
  selectedCamera: null,
  isSelectedCameraLoading: false
};

const selectedCardDataSlice = createSlice({
  name: NameSpace.SelectedCard,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchSelectedCameraAction.pending, (state) => {
        state.isSelectedCameraLoading = true;
      })
      .addCase(fetchSelectedCameraAction.fulfilled, (state, action) => {
        state.isSelectedCameraLoading = false;
        state.selectedCamera = action.payload;
      })
      .addCase(fetchSelectedCameraAction.rejected, (state) => {
        state.isSelectedCameraLoading = false;
      });
  },
});

export {
  selectedCardDataSlice,

};
