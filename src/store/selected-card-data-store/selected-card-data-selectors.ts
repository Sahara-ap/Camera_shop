import { NameSpace } from '../../consts';
import { State } from '../../types/store';

const getSelectedCamera = (state: Pick<State, NameSpace.SelectedCard>) => state[NameSpace.SelectedCard].selectedCamera;
const getIsSelectedCameraLoading = (state: Pick<State, NameSpace.SelectedCard>) => state[NameSpace.SelectedCard].isSelectedCameraLoading;

export {
  getSelectedCamera,
  getIsSelectedCameraLoading,
};
