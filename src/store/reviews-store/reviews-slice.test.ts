import { LoadingDataStatus } from '../../consts';
import { makeFakeReview, makeFakeReviewPost, makeFakeReviews } from '../../utils/mocks';
import { fetchReviews, postReview } from '../api-actions/reviews-action';
import { reviewsSlice, setReviewSendingStatus } from './reviews-slice';

describe('reviews-slice', () => {
  const initialState = {
    reviews: [],
    isReviewLoading: false,
    reviewSendingStatus: LoadingDataStatus.Unsent,
  };

  describe('general tests', () => {
    it('should return initial state with empty action',
      () => {
        const emptyAction = { type: '' };
        const expectedState = initialState;

        const result = reviewsSlice.reducer(expectedState, emptyAction);
        expect(result).toEqual(initialState);
      });
    it('should return initial state with empty action and undefined state',
      () => {
        const emptyAction = { type: '' };
        const expectedState = initialState;

        const result = reviewsSlice.reducer(undefined, emptyAction);
        expect(result).toEqual(expectedState);
      });
  });

  describe('reducers', () => {
    it('should set "reviewSendingStatus" to payload value with "setReviewSendingStatus" action',
      () => {
        const expectedResult = LoadingDataStatus.Success;

        const result = reviewsSlice.reducer(undefined, setReviewSendingStatus(LoadingDataStatus.Success));
        expect(result.reviewSendingStatus).toBe(expectedResult);
      });
  });

  describe('extraReducers: fetchReviews', () => {
    it('should set "isReviewLoading" to true with fetchReviews.pending thunkAction',
      () => {
        const expectedResult = true;

        const result = reviewsSlice.reducer(undefined, fetchReviews.pending);
        expect(result.isReviewLoading).toBe(expectedResult);
      });
    it('should set "isReviewLoading" to false with fetchReviews.rejected thunkAction',
      () => {
        const expectedResult = false;

        const result = reviewsSlice.reducer(undefined, fetchReviews.rejected);
        expect(result.isReviewLoading).toBe(expectedResult);
      });
    it('should set "isReviewLoading" to false and "reviews" to payload value with fetchReviews.fulfilled thunkAction',
      () => {
        const cameraId = '21';
        const isReviewLoading = false;
        const expectedReviews = makeFakeReviews();

        const result = reviewsSlice.reducer(undefined, fetchReviews.fulfilled(expectedReviews, '', cameraId));

        expect(result.isReviewLoading).toBe(isReviewLoading);
        expect(result.reviews).toEqual(expectedReviews);

      });
  });


  describe('extraReducers: postReview', () => {
    it('should set "reviewSendingStatus" to "PENDING" with postReview.pending thunkAction',
      () => {
        const expectedResult = LoadingDataStatus.Pending;

        const result = reviewsSlice.reducer(undefined, postReview.pending);
        expect(result.reviewSendingStatus).toBe(expectedResult);
      });
    it('should set "reviewSendingStatus" to "ERROR" with postReview.rejected thunkAction',
      () => {
        const expectedResult = LoadingDataStatus.Error;

        const result = reviewsSlice.reducer(undefined, postReview.rejected);
        expect(result.reviewSendingStatus).toBe(expectedResult);
      });
    it('should set "reviewSendingStatus" to "SUCCESS" and push review in "reviews" with postReview.fulfilled thunkAction',
      () => {
        const mockReview = makeFakeReview();
        const expectedReviews = [mockReview];

        const expectedReviewSendingStatus = LoadingDataStatus.Success;
        const mockBody = makeFakeReviewPost();

        const result = reviewsSlice.reducer(undefined, postReview.fulfilled(mockReview, '', mockBody));

        expect(result.reviewSendingStatus).toBe(expectedReviewSendingStatus);
        expect(result.reviews).toEqual(expectedReviews);

      });
  });


});
