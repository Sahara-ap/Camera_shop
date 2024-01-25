import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { fetchCamerasAction } from '../api-actions/card-action';
import { NameSpace } from '../../consts';

type TAppDataState = {
  error: null | string;
  hasError: boolean;
}

const initialState: TAppDataState = {
  error: null,
  hasError: false,
};

const appDataSlice = createSlice({
  name: NameSpace.App,
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<null | string>) => {
      state.error = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCamerasAction.fulfilled, (state) => {
        state.hasError = false;
      })
      .addCase(fetchCamerasAction.rejected, (state) => {
        state.hasError = true;
      });
  }
});

export {
  appDataSlice,
};

