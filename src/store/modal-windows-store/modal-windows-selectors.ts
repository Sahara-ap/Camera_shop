import { NameSpace } from '../../consts';
import { State } from '../../types/store';

const getIsBuyProductActive = (state:Pick<State, NameSpace.Modals>) => state[NameSpace.Modals].isBuyProductActive;

export {
  getIsBuyProductActive,
};

