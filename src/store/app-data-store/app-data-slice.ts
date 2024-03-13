import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { fetchCamerasAction, fetchSelectedCameraAction, fetchSimilars } from '../api-actions/card-actions';
import { NameSpace, SortingOrder, SortingType } from '../../consts';
import { fetchReviews } from '../api-actions/reviews-action';
import { TCameraCategory, TCameraLevel, TCameraType } from '../../types/general-types';
import { postCoupon } from '../api-actions/basket-actions';

type TAppDataState = {
  errorServerResponse: null | string;
  hasErrorWithConnection: boolean;

  priceMinFilter: string;
  priceMaxFilter: string;
  categoryFilterList: TCameraCategory[];
  typeFilterList: TCameraType[];
  levelFilterList: TCameraLevel[];

  sortType: SortingType;
  sortOrder: SortingOrder;
}

const initialState: TAppDataState = {
  errorServerResponse: null,
  hasErrorWithConnection: false,

  priceMinFilter: '',
  priceMaxFilter: '',
  categoryFilterList: [],
  typeFilterList: [],
  levelFilterList: [],

  sortType: SortingType.Non,
  sortOrder: SortingOrder.Non
};

const appDataSlice = createSlice({
  name: NameSpace.App,
  initialState,
  reducers: {
    setErrorServerResponse: (state, action: PayloadAction<null | string>) => {
      state.errorServerResponse = action.payload;
    },

    setPriceMinFilter: (state, action: PayloadAction<string>) => {
      state.priceMinFilter = action.payload;
    },
    setPriceMaxFilter: (state, action: PayloadAction<string>) => {
      state.priceMaxFilter = action.payload;
    },
    setCategoryFilterList: (state, action: PayloadAction<TCameraCategory[]>) => {
      state.categoryFilterList = action.payload;
    },
    setTypeFilterList: (state, action: PayloadAction<TCameraType[]>) => {
      state.typeFilterList = action.payload;
    },
    setLevelFilterList: (state, action: PayloadAction<TCameraLevel[]>) => {
      state.levelFilterList = action.payload;
    },

    setSortType: (state, action: PayloadAction<SortingType>) => {
      state.sortType = action.payload;
    },
    setSortOrder: (state, action: PayloadAction<SortingOrder>) => {
      state.sortOrder = action.payload;
    },
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
      })

      .addCase(postCoupon.fulfilled, (state) => {
        state.hasErrorWithConnection = false;
      })
      .addCase(postCoupon.rejected, (state) => {
        state.hasErrorWithConnection = true;
      });
  }
});
const {
  setErrorServerResponse,
  setPriceMinFilter, setPriceMaxFilter, setCategoryFilterList, setTypeFilterList, setLevelFilterList,
  setSortType, setSortOrder,
} = appDataSlice.actions;

export {
  appDataSlice,

  setErrorServerResponse,

  setPriceMinFilter,
  setPriceMaxFilter,
  setCategoryFilterList,
  setTypeFilterList,
  setLevelFilterList,

  setSortType,
  setSortOrder,
};

