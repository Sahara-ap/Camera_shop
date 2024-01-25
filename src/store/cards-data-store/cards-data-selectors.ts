import { NameSpace } from '../../consts';
import { State } from '../../types/store';

const getCameras = (state: Pick<State, NameSpace.Cards>) => (state[NameSpace.Cards].cameras);
const getIsCamerasLoading = (state: Pick<State, NameSpace.Cards>) => (state[NameSpace.Cards].isCamerasLoading);

export {
  getCameras,
  getIsCamerasLoading,
};
