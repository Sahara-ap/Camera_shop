import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { fetchCamerasAction } from '../api-actions/card-action';
import { NameSpace } from '../../consts';

type TAppDataState = {
  errorServerResponse: null | string;
  hasErrorWithConnection: boolean;
}

const initialState: TAppDataState = {
  errorServerResponse: null,
  hasErrorWithConnection: false,
};

const appDataSlice = createSlice({
  name: NameSpace.App,
  initialState,
  reducers: {
    setErrorServerResponse: (state, action: PayloadAction<null | string>) => {
      state.errorServerResponse = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCamerasAction.fulfilled, (state) => {
        state.hasErrorWithConnection = false;
      })
      .addCase(fetchCamerasAction.rejected, (state) => {
        state.hasErrorWithConnection = true;
      });
  }
});
const {setErrorServerResponse} = appDataSlice.actions;

export {
  appDataSlice,

  setErrorServerResponse,
};
