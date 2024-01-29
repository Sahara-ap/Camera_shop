import { NameSpace } from '../../consts';
import { State } from '../../types/store';

const getError = (state: Pick<State, NameSpace.App>) => state[NameSpace.App].error;
const getHasError = (state: Pick<State, NameSpace.App>) => state[NameSpace.App].hasError;

export {
  getError,
  getHasError,
};
