import { createAsyncThunk } from '@reduxjs/toolkit';

import { APIRoute } from '../../consts';

import { TCard } from '../../types/generalTypes';
import { ThunkAPI } from '../../types/store';

const fetchCamerasAction = createAsyncThunk<TCard[], undefined, ThunkAPI>(
  'cards/fetchCameras',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<TCard[]>(APIRoute.Cameras);
    return data;

  });

export {
  fetchCamerasAction,
};
