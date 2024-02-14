import { createSlice } from '@reduxjs/toolkit';

import { TSimilar } from '../../types/general-types';
import { NameSpace } from '../../consts';
import { fetchSimilars } from '../api-actions/card-actions';


type TSimilarsState = {
  similars: TSimilar[];
  isSimilarsLoading: boolean;
}
const initialState: TSimilarsState = {
  similars: [],
  isSimilarsLoading: false,
};

const similarsSlice = createSlice({
  name: NameSpace.Similar,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchSimilars.pending, (state) => {
        state.isSimilarsLoading = true;
      })
      .addCase(fetchSimilars.fulfilled, (state, action) => {
        state.isSimilarsLoading = false;
        state.similars = action.payload;
      })
      .addCase(fetchSimilars.rejected, (state) => {
        state.isSimilarsLoading = false;
      });
  }
});

export {
  similarsSlice,

};
