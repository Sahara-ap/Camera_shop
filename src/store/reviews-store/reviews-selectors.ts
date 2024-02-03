import { createSelector } from '@reduxjs/toolkit';
import { NameSpace } from '../../consts';

import { State } from '../../types/store';
import { TReview } from '../../types/generalTypes';
import { convertDateInMs } from '../../utils/utils-functions';

const getReviews = (state:Pick<State, NameSpace.Reviews>) => (state[NameSpace.Reviews].reviews);
const getIsReviewsLoading = (state:Pick<State, NameSpace.Reviews>) => (state[NameSpace.Reviews].isReviewLoading);

const getSortedReviews = createSelector([getReviews], (reviews:TReview[]) => reviews.slice()
  .sort((reviewA, reviewB) => convertDateInMs(reviewB.createAt) - convertDateInMs(reviewA.createAt)));


export {
  getReviews,
  getSortedReviews,
  getIsReviewsLoading,
};
