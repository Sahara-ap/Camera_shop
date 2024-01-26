import { createAsyncThunk } from '@reduxjs/toolkit';

import { APIRoute } from '../../consts';

import { TCameraId, TCard, TSelectedCard } from '../../types/generalTypes';
import { ThunkAPI } from '../../types/store';

const fetchCamerasAction = createAsyncThunk<TCard[], undefined, ThunkAPI>(
  'cards/fetchCameras',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<TCard[]>(APIRoute.Cameras);
    return data;
  });

const fetchSelectedCameraAction = createAsyncThunk<TSelectedCard, TCameraId, ThunkAPI>(
  'selectedCard/fetchSelectedCamera',
  async (cameraId, { extra: api }) => {
    const {data} = await api.get<TSelectedCard>(`${APIRoute.SelectedCamera}/${cameraId}`);
    return data;
  }
);

export {
  fetchCamerasAction,
  fetchSelectedCameraAction,
};
