import { createSelector } from '@reduxjs/toolkit';
import { State } from '../../types/store';
import { TCameraCategory, TCameraLevel, TCameraType, TCard } from '../../types/general-types';
import { getCategoryFilterList, getLevelFilterList, getPriceMaxFilter, getPriceMinFilter, getTypeFilterList } from '../app-data-store/app-data-selectors';

import { NameSpace } from '../../consts';

const FULL_CATEGORY_FILTER_LIST: TCameraCategory[] = ['Видеокамера', 'Фотоаппарат'];
const FULL_TYPE_FILTER_LIST: TCameraType[] = ['Коллекционная', 'Моментальная', 'Цифровая', 'Плёночная'];
const FULL_LEVEL_FILTER_LIST: TCameraLevel[] = ['Нулевой', 'Любительский', 'Профессиональный'];

const getCameras = (state: Pick<State, NameSpace.Cards>) => (state[NameSpace.Cards].cameras);
const getIsCamerasLoading = (state: Pick<State, NameSpace.Cards>) => (state[NameSpace.Cards].isCamerasLoading);


const getMinAndMaxCameraPricesInAllList = createSelector([getCameras], (cameras) => {
  const prices = cameras.map((camera) => camera.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  return [minPrice, maxPrice];
});


const getFilterCameras = createSelector(
  [getPriceMinFilter, getPriceMaxFilter, getCategoryFilterList, getTypeFilterList, getLevelFilterList, getMinAndMaxCameraPricesInAllList, getCameras],
  (minPriceFilter, maxPriceFilter, categoryFilterList, typeFilterList, levelFilterList, [minPriceInAllList, maxPriceInAllList], cameras) => {

    const minPriceValue = minPriceFilter !== '' ? Number(minPriceFilter) : minPriceInAllList;
    const maxPriceValue = maxPriceFilter !== '' ? Number(maxPriceFilter) : maxPriceInAllList;

    const categoryFilters = categoryFilterList.length !== 0 ? categoryFilterList : FULL_CATEGORY_FILTER_LIST;
    const typeFilters = typeFilterList.length !== 0 ? typeFilterList : FULL_TYPE_FILTER_LIST;
    const levelFilters = levelFilterList.length !== 0 ? levelFilterList : FULL_LEVEL_FILTER_LIST;

    const [firstCategoryValue, secondCategoryValue] = categoryFilters;
    const [firstTypeValue, secondTypeValue, thirdTypeValue, forthTypeValue] = typeFilters;
    const [firstLevelValue, secondLevelValue, thirdLevelValue] = levelFilters;

    const preparedCameraList = [];

    const filterByAllGroupsCameras = cameras.filter((camera) => (
      (camera.category === firstCategoryValue || camera.category === secondCategoryValue)
      &&
      (camera.type === firstTypeValue
        || camera.type === secondTypeValue
        || camera.type === thirdTypeValue
        || camera.type === forthTypeValue)
      &&
      (camera.level === firstLevelValue
        || camera.level === secondLevelValue
        || camera.level === thirdLevelValue)
      &&
      (camera.price >= minPriceValue && camera.price <= maxPriceValue)
    ));

    preparedCameraList.push(...filterByAllGroupsCameras);

    return preparedCameraList;
  });


const getSortedByPriceCameras = createSelector([getFilterCameras], (cameras) => cameras.slice().sort((cameraA, cameraB) => cameraA.price - cameraB.price));
const getMinAndMaxCameraPrices = createSelector([getSortedByPriceCameras], (cameras) => {
  const sortedPriceList: TCard['price'][] = cameras.map((camera) => camera.price);
  const minPrice = sortedPriceList.at(0) as number;
  const maxPrice = sortedPriceList.at(-1) as number;

  return [minPrice, maxPrice];
});

export {
  getCameras,
  getIsCamerasLoading,

  getSortedByPriceCameras,
  getMinAndMaxCameraPrices,

  getFilterCameras,

  FULL_CATEGORY_FILTER_LIST,
  FULL_TYPE_FILTER_LIST,
  FULL_LEVEL_FILTER_LIST,
};
