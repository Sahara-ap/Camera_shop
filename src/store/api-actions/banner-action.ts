import { createAsyncThunk } from '@reduxjs/toolkit';

import { APIRoute } from '../../consts';

import { TBanner } from '../../types/general-types';
import { ThunkAPI } from '../../types/store';

const fetchBannerAction = createAsyncThunk<TBanner[], undefined, ThunkAPI>(
  'banner/fetchBanners',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<TBanner[]>(APIRoute.Banner);
    return data;

  });

export {
  fetchBannerAction,
};
