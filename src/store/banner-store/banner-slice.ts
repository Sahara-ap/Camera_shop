import { createSlice } from '@reduxjs/toolkit';

import { NameSpace } from '../../consts';
import { TBanner } from '../../types/generalTypes';
import { fetchBannerAction } from '../api-actions/banner-action';

type TBannerState = {
  bannerCards: TBanner[];
  isBannerCardLoading: boolean;
  isBannerError: boolean;
}

const initialState: TBannerState = {
  bannerCards: [],
  isBannerCardLoading: false,
  isBannerError: false
};

const bannerSlice = createSlice({
  name: NameSpace.Banner,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchBannerAction.pending, (state) => {
        state.isBannerCardLoading = true;
        state.isBannerError = false;
      })
      .addCase(fetchBannerAction.fulfilled, (state, action) => {
        state.bannerCards = action.payload;
        state.isBannerCardLoading = false;
        state.isBannerError = false;
      })
      .addCase(fetchBannerAction.rejected, (state) => {
        state.isBannerCardLoading = false;
        state.isBannerError = true;
      });
  }
});

export {
  bannerSlice,

};
