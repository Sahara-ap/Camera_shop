import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { fetchCamerasAction, fetchSelectedCameraAction, fetchSimilars } from '../api-actions/card-actions';
import { NameSpace } from '../../consts';
import { fetchReviews } from '../api-actions/reviews-action';
import { TCameraCategory, TCameraType } from '../../types/general-types';

type TAppDataState = {
  errorServerResponse: null | string;
  hasErrorWithConnection: boolean;

  categoryFilterList: TCameraCategory[];
  typeFilterList: TCameraType[];
}

const initialState: TAppDataState = {
  errorServerResponse: null,
  hasErrorWithConnection: false,

  categoryFilterList: [],
  typeFilterList: [],
};

const appDataSlice = createSlice({
  name: NameSpace.App,
  initialState,
  reducers: {
    setErrorServerResponse: (state, action: PayloadAction<null | string>) => {
      state.errorServerResponse = action.payload;
    },
    setCategoryFilterList: (state, action: PayloadAction<TCameraCategory[]>) => {
      state.categoryFilterList = action.payload;
    },
    setTypeFilterList: (state, action: PayloadAction<TCameraType[]>) => {
      state.typeFilterList = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCamerasAction.fulfilled, (state) => {
        state.hasErrorWithConnection = false;
      })
      .addCase(fetchCamerasAction.rejected, (state) => {
        state.hasErrorWithConnection = true;
      })

      .addCase(fetchSelectedCameraAction.fulfilled, (state) => {
        state.hasErrorWithConnection = false;
      })
      .addCase(fetchSelectedCameraAction.rejected, (state) => {
        state.hasErrorWithConnection = true;
      })

      .addCase(fetchSimilars.fulfilled, (state) => {
        state.hasErrorWithConnection = false;
      })
      .addCase(fetchSimilars.rejected, (state) => {
        state.hasErrorWithConnection = true;
      })

      .addCase(fetchReviews.fulfilled, (state) => {
        state.hasErrorWithConnection = false;
      })
      .addCase(fetchReviews.rejected, (state) => {
        state.hasErrorWithConnection = true;
      });
  }
});
const {setErrorServerResponse, setCategoryFilterList, setTypeFilterList} = appDataSlice.actions;

export {
  appDataSlice,

  setErrorServerResponse,
  setCategoryFilterList,
  setTypeFilterList,
};

