import { createSelector } from '@reduxjs/toolkit';
import { NameSpace } from '../../consts';

import { State } from '../../types/store';
import { TReview } from '../../types/generalTypes';
import { convertDateInMs } from '../../utils/utils-functions';

const getReviews = (state:Pick<State, NameSpace.Reviews>) => (state[NameSpace.Reviews].reviews);
const getSortedReviews = createSelector([getReviews], (reviews:TReview[]) => reviews.slice()
  .sort((reviewA, reviewB) => convertDateInMs(reviewB.createAt) - convertDateInMs(reviewA.createAt)));

const getIsReviewsLoading = (state:Pick<State, NameSpace.Reviews>) => (state[NameSpace.Reviews].isReviewLoading);
const getReviewSendingStatus = (state:Pick<State, NameSpace.Reviews>) => (state[NameSpace.Reviews].reviewSendingStatus);


export {
  getReviews,
  getSortedReviews,

  getIsReviewsLoading,
  getReviewSendingStatus,
};
