import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../consts';
import { TReview } from '../../types/generalTypes';
import { fetchReviews } from '../api-actions/reviews-action';

type TReviewsState = {
  reviews: TReview[];
  isReviewLoading: boolean;
}
const initialState: TReviewsState = {
  reviews: [],
  isReviewLoading: false,
};

const reviewsSlice = createSlice({
  name: NameSpace.Reviews,
  initialState,
  reducers: {
    dropReviews: (state) => {
      state.reviews = [];
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.isReviewLoading = true;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.isReviewLoading = false;
        state.reviews = action.payload;
      })
      .addCase(fetchReviews.rejected, (state) => {
        state.isReviewLoading = false;
      });
  }
});

const {dropReviews} = reviewsSlice.actions;

export {
  reviewsSlice,

  dropReviews,
};
