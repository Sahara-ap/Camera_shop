import { NameSpace } from '../../consts';
import { State } from '../../types/store';

const getErrorServerResponse = (state: Pick<State, NameSpace.App>) => state[NameSpace.App].errorServerResponse;
const getHasErrorWithConnection = (state: Pick<State, NameSpace.App>) => state[NameSpace.App].hasErrorWithConnection;

const getCategoryFilterList = (state: Pick<State, NameSpace.App>) => state[NameSpace.App].categoryFilterList;
const getTypeFilterList = (state: Pick<State, NameSpace.App>) => state[NameSpace.App].typeFilterList;

export {
  getErrorServerResponse,
  getHasErrorWithConnection,

  getCategoryFilterList,
  getTypeFilterList
};
