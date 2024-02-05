import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../consts';
import { TReview } from '../../types/generalTypes';
import { fetchReviews, postReview } from '../api-actions/reviews-action';

type TReviewsState = {
  reviews: TReview[];
  isReviewLoading: boolean;
  isReviewSending: boolean;
}
const initialState: TReviewsState = {
  reviews: [],
  isReviewLoading: false,
  isReviewSending: false,
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
      })

      .addCase(postReview.pending, (state) => {
        state.isReviewSending = true;
      })
      .addCase(postReview.fulfilled, (state, action) => {
        state.isReviewSending = false;
        state.reviews.push(action.payload);
      })
      .addCase(postReview.rejected, (state) => {
        state.isReviewSending = false;
      });
  }
});

const {dropReviews} = reviewsSlice.actions;

export {
  reviewsSlice,

  dropReviews,
};
