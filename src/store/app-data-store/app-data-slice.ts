import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { fetchCamerasAction, fetchSelectedCameraAction, fetchSimilars } from '../api-actions/card-actions';
import { CategoryName, NameSpace } from '../../consts';
import { fetchReviews } from '../api-actions/reviews-action';

type TAppDataState = {
  errorServerResponse: null | string;
  hasErrorWithConnection: boolean;
  filterCategoryList: CategoryName[];
}

const initialState: TAppDataState = {
  errorServerResponse: null,
  hasErrorWithConnection: false,

  filterCategoryList: [],
};

const appDataSlice = createSlice({
  name: NameSpace.App,
  initialState,
  reducers: {
    setErrorServerResponse: (state, action: PayloadAction<null | string>) => {
      state.errorServerResponse = action.payload;
    },
    setFilterCategoryList: (state, action: PayloadAction<CategoryName[]>) => {
      state.filterCategoryList = action.payload;
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
const {setErrorServerResponse, setFilterCategoryList} = appDataSlice.actions;

export {
  appDataSlice,

  setErrorServerResponse,
  setFilterCategoryList,
};

