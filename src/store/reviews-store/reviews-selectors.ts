import { NameSpace } from '../../consts';

import { State } from '../../types/store';

const getReviews = (state:Pick<State, NameSpace.Reviews>) => (state[NameSpace.Reviews].reviews);
const getIsReviewsLoading = (state:Pick<State, NameSpace.Reviews>) => (state[NameSpace.Reviews].isReviewLoading);

export {
  getReviews,
  getIsReviewsLoading,
};
