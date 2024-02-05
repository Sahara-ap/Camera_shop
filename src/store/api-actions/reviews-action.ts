import { createAsyncThunk } from '@reduxjs/toolkit';

import { TCameraId, TReview, TReviewPost } from '../../types/generalTypes';
import { ThunkAPI } from '../../types/store';
import { APIRoute } from '../../consts';

const fetchReviews = createAsyncThunk<TReview[], TCameraId, ThunkAPI>(
  'reviews/fetch',
  async(cameraId, {extra: api}) => {
    const path = `${APIRoute.Cameras}/${cameraId}${APIRoute.Reviews}`;
    const {data} = await api.get<TReview[]>(path);

    return data;
  }
);

const postReview = createAsyncThunk<TReview, TReviewPost, ThunkAPI>(
  'review/post',
  async(body, {extra: api}) => {
    const path = `${APIRoute.Cameras}/${body.cameraId}${APIRoute.Reviews}`;
    const {data} = await api.post<TReview>(path, body);

    return data;
  }
);

export {
  fetchReviews,
  postReview
};
