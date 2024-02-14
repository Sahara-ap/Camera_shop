import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../consts';

import { TCard } from '../../types/general-types';
import { fetchCamerasAction } from '../api-actions/card-actions';

type TCardsDataState = {
  cameras: TCard[];
  isCamerasLoading: boolean;
}

const initialState: TCardsDataState = {
  cameras: [],
  isCamerasLoading: false
};

const cardsDataSlice = createSlice({
  name: NameSpace.Cards,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCamerasAction.pending, (state) => {
        state.isCamerasLoading = true;
      })
      .addCase(fetchCamerasAction.fulfilled, (state, action) => {
        state.cameras = action.payload;
        state.isCamerasLoading = false;
      })
      .addCase(fetchCamerasAction.rejected, (state) => {
        state.isCamerasLoading = false;
      });
  }
});

export {
  cardsDataSlice,
};
