import { createAsyncThunk } from '@reduxjs/toolkit';

import { TCameraId, TReview } from '../../types/generalTypes';
import { ThunkAPI } from '../../types/store';
import { APIRoute } from '../../consts';

const fetchReviews = createAsyncThunk<TReview[], TCameraId, ThunkAPI>(
  'reviews/fetch',
  async(cameraId, {extra: api}) => {
    const {data} = await api.get<TReview[]>(`${APIRoute.Cameras}/${cameraId}${APIRoute.Reviews}`);

    return data;
  }
);

export {
  fetchReviews,
};
