import { NameSpace } from '../../consts';
import { State } from '../../types/store';

const getErrorServerResponse = (state: Pick<State, NameSpace.App>) => state[NameSpace.App].errorServerResponse;
const getHasErrorWithConnection = (state: Pick<State, NameSpace.App>) => state[NameSpace.App].hasErrorWithConnection;

const getPriceMinFilter = (state: Pick<State, NameSpace.App>) => state[NameSpace.App].priceMinFilter;
const getPriceMaxFilter = (state: Pick<State, NameSpace.App>) => state[NameSpace.App].priceMaxFilter;
const getCategoryFilterList = (state: Pick<State, NameSpace.App>) => state[NameSpace.App].categoryFilterList;
const getTypeFilterList = (state: Pick<State, NameSpace.App>) => state[NameSpace.App].typeFilterList;
const getLevelFilterList = (state: Pick<State, NameSpace.App>) => state[NameSpace.App].levelFilterList;

const getSortType = (state: Pick<State, NameSpace.App>) => state[NameSpace.App].sortType;
const getSortOrder = (state: Pick<State, NameSpace.App>) => state[NameSpace.App].sortOrder;

export {
  getErrorServerResponse,
  getHasErrorWithConnection,

  getPriceMinFilter,
  getPriceMaxFilter,
  getCategoryFilterList,
  getTypeFilterList,
  getLevelFilterList,

  getSortType,
  getSortOrder,
};
