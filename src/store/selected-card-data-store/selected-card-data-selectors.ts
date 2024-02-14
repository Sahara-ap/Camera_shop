import { createSelector } from '@reduxjs/toolkit';
import { NameSpace } from '../../consts';
import { State } from '../../types/store';
import { TSelectedCard } from '../../types/general-types';

const getSelectedCamera = (state: Pick<State, NameSpace.SelectedCard>) => state[NameSpace.SelectedCard].selectedCamera;
const getSelectedCameraName = createSelector([getSelectedCamera], (selectedCamera: TSelectedCard | null) => selectedCamera?.name);
const getIsSelectedCameraLoading = (state: Pick<State, NameSpace.SelectedCard>) => state[NameSpace.SelectedCard].isSelectedCameraLoading;

export {
  getSelectedCamera,
  getSelectedCameraName,
  getIsSelectedCameraLoading,
};
