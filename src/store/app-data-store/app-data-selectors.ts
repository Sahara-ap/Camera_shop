import { NameSpace } from '../../consts';
import { State } from '../../types/store';

const getErrorServerResponse = (state: Pick<State, NameSpace.App>) => state[NameSpace.App].errorServerResponse;
const getHasErrorWithConnection = (state: Pick<State, NameSpace.App>) => state[NameSpace.App].hasErrorWithConnection;

export {
  getErrorServerResponse,
  getHasErrorWithConnection,
};
