import { PayloadAction, createSlice } from '@reduxjs/toolkit';
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
  }
});

export {
  appDataSlice,
};

