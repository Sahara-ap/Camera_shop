import { createSelector } from '@reduxjs/toolkit';
import { NameSpace } from '../../consts';
import { State } from '../../types/store';
import { TCard } from '../../types/generalTypes';

const getCameras = (state: Pick<State, NameSpace.Cards>) => (state[NameSpace.Cards].cameras);
const getIsCamerasLoading = (state: Pick<State, NameSpace.Cards>) => (state[NameSpace.Cards].isCamerasLoading);

const getSortedCameras = createSelector([getCameras], (cameras) => cameras.sort((cameraA, cameraB) => cameraA.price - cameraB.price));
const getMinAndMaxCameraPrices = createSelector([getSortedCameras], (cameras) => {
  const sortedPriceList: TCard['price'][] = cameras.map((camera) => camera.price);
  const minPrice = sortedPriceList.at(0) as number;
  const maxPrice = sortedPriceList.at(-1) as number;

  return [minPrice, maxPrice];

});

export {
  getCameras,
  getIsCamerasLoading,

  getSortedCameras,
  getMinAndMaxCameraPrices,
};
