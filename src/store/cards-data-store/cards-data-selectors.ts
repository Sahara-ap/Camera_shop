import { createSelector } from '@reduxjs/toolkit';
import { NameSpace } from '../../consts';
import { State } from '../../types/store';
import { TCard } from '../../types/general-types';
import { getCategoryFilterList } from '../app-data-store/app-data-selectors';

const getCameras = (state: Pick<State, NameSpace.Cards>) => (state[NameSpace.Cards].cameras);
const getIsCamerasLoading = (state: Pick<State, NameSpace.Cards>) => (state[NameSpace.Cards].isCamerasLoading);

const getSortedByPriceCameras = createSelector([getCameras], (cameras) => cameras.slice().sort((cameraA, cameraB) => cameraA.price - cameraB.price));
const getMinAndMaxCameraPrices = createSelector([getSortedByPriceCameras], (cameras) => {
  const sortedPriceList: TCard['price'][] = cameras.map((camera) => camera.price);
  const minPrice = sortedPriceList.at(0) as number;
  const maxPrice = sortedPriceList.at(-1) as number;

  return [minPrice, maxPrice];
});


const getFilterCameras = createSelector([getCategoryFilterList, getCameras], (categoryFilterList, cameras) => {
  const [categoryValue] = categoryFilterList;

  const isFilterValuesValid = Boolean(categoryValue);

  const preparedCameraList = isFilterValuesValid ? [] : cameras;
  if (categoryValue) {
    const filterByCategoryCameras = cameras.filter((camera) => camera.category === categoryValue);
    preparedCameraList.push(...filterByCategoryCameras);
  }

  return preparedCameraList;
});

export {
  getCameras,
  getIsCamerasLoading,

  getSortedByPriceCameras,
  getMinAndMaxCameraPrices,

  getFilterCameras,
};
