import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../consts';

import { TCard } from '../../types/generalTypes';
import { makeFakeCards } from '../../utils/mocks';
import { fetchCamerasAction } from '../api-actions/card-action';

type TCardsDataState = {
  cameras: TCard[];
  isCamerasLoading: boolean;
}

const initialState: TCardsDataState = {
  cameras: makeFakeCards(),
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
