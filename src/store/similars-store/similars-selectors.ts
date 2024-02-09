import { NameSpace } from '../../consts';

import { State } from '../../types/store';

const getSimilars = (state:Pick<State, NameSpace.Similar>) => (state[NameSpace.Similar].similars);
const getIsSimilarsLoading = (state:Pick<State, NameSpace.Similar>) => (state[NameSpace.Similar].isSimilarsLoading);

export {
  getSimilars,
  getIsSimilarsLoading,
};
