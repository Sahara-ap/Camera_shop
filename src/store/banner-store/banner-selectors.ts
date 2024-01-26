import { NameSpace } from '../../consts';
import { State } from '../../types/store';

const getBannerCards = (state: Pick<State, NameSpace.Banner>) => (state[NameSpace.Banner].bannerCards);
const getIsBannerCardsLoading = (state: Pick<State, NameSpace.Banner>) => (state[NameSpace.Banner].isBannerCardLoading);
const getIsBannerError = (state: Pick<State, NameSpace.Banner>) => (state[NameSpace.Banner].isBannerError);

export {
  getBannerCards,
  getIsBannerCardsLoading,
  getIsBannerError
};
