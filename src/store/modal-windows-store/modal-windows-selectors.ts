import { NameSpace } from '../../consts';
import { State } from '../../types/store';

const getIsBuyProductActive = (state:Pick<State, NameSpace.Modals>) => state[NameSpace.Modals].isBuyProductActive;
const getProductData = (state:Pick<State, NameSpace.Modals>) => state[NameSpace.Modals].productData;

const getIsReviewModalActive = (state:Pick<State, NameSpace.Modals>) => state[NameSpace.Modals].isReviewModalActive;
const getIsReviewModalSuccessActive = (state:Pick<State, NameSpace.Modals>) => state[NameSpace.Modals].isReviewModalSuccessActive;

export {
  getIsBuyProductActive,
  getProductData,

  getIsReviewModalActive,
  getIsReviewModalSuccessActive,
};

