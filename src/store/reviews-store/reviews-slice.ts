import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { LoadingDataStatus, NameSpace } from '../../consts';
import { TReview } from '../../types/general-types';
import { fetchReviews, postReview } from '../api-actions/reviews-action';

type TReviewsState = {
  reviews: TReview[];
  isReviewLoading: boolean;
  reviewSendingStatus: LoadingDataStatus;
}
const initialState: TReviewsState = {
  reviews: [],
  isReviewLoading: false,
  reviewSendingStatus: LoadingDataStatus.Unsent,
};

const reviewsSlice = createSlice({
  name: NameSpace.Reviews,
  initialState,
  reducers: {
    setReviewSendingStatus: (state, action: PayloadAction<LoadingDataStatus>) => {
      state.reviewSendingStatus = action.payload;
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
        state.reviewSendingStatus = LoadingDataStatus.Pending;
      })
      .addCase(postReview.fulfilled, (state, action) => {
        state.reviewSendingStatus = LoadingDataStatus.Success;
        state.reviews.push(action.payload);
      })
      .addCase(postReview.rejected, (state) => {
        state.reviewSendingStatus = LoadingDataStatus.Error;
      });
  }
});

const { setReviewSendingStatus } = reviewsSlice.actions;

export {
  reviewsSlice,

  setReviewSendingStatus
};
