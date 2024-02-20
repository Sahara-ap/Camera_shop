import { createSelector } from '@reduxjs/toolkit';
import { NameSpace } from '../../consts';
import { State } from '../../types/store';
import { TCard } from '../../types/general-types';
import { getCategoryFilterList, getTypeFilterList } from '../app-data-store/app-data-selectors';

const getCameras = (state: Pick<State, NameSpace.Cards>) => (state[NameSpace.Cards].cameras);
const getIsCamerasLoading = (state: Pick<State, NameSpace.Cards>) => (state[NameSpace.Cards].isCamerasLoading);

const getSortedByPriceCameras = createSelector([getCameras], (cameras) => cameras.slice().sort((cameraA, cameraB) => cameraA.price - cameraB.price));
const getMinAndMaxCameraPrices = createSelector([getSortedByPriceCameras], (cameras) => {
  const sortedPriceList: TCard['price'][] = cameras.map((camera) => camera.price);
  const minPrice = sortedPriceList.at(0) as number;
  const maxPrice = sortedPriceList.at(-1) as number;

  return [minPrice, maxPrice];
});

const FULL_CATEGORY_FILTER_LIST = ['Видеокамера', 'Фотокамера'];
const FULL_TYPE_FILTER_LIST = ['Коллекционная', 'Цифровая', 'Плёночная', 'Моментальная'];
const FULL_LEVEL_FILTER_LIST = ['Нулевой', 'Любительский', 'Профессиональный'];

const getFilterCameras = createSelector([getCategoryFilterList, getTypeFilterList, getCameras], (categoryFilterList, typeFilterList, cameras) => {
  const categoryFilters = categoryFilterList.length === 0 ? FULL_CATEGORY_FILTER_LIST : categoryFilterList;
  const typeFilters = typeFilterList.length === 0 ? FULL_TYPE_FILTER_LIST : typeFilterList;

  const [firstCategoryValue, secondCategoryValue] = categoryFilters;
  const [firstTypeValue, secondTypeValue, thirdTypeValue, forthTypeValue] = typeFilters;
  //если categoryFilterList.length === 0 ,т.е пользователь не выбрал ни одну категорию
  // то в набор нужно установить все значения

  const isFilterValuesValid =
    categoryFilterList.length !== 0
    || typeFilterList.length !== 0;

  // const preparedCameraList = isFilterValuesValid ? [] : cameras;
  const preparedCameraList = [];

  const filterByCategoryCameras = cameras.filter((camera) => (
    (camera.category === firstCategoryValue || camera.category === secondCategoryValue)
    &&
    (camera.type === firstTypeValue
      || camera.type === secondTypeValue
      || camera.type === thirdTypeValue
      || camera.type === forthTypeValue)
  ));
  console.log(filterByCategoryCameras);

  preparedCameraList.push(...filterByCategoryCameras);

  // if (typeFilterList.length !== 0) {
  //   const filterByTypeCameras = cameras.filter((camera) => (
  //     camera.type === firstTypeValue
  //     || camera.type === secondTypeValue
  //     || camera.type === thirdTypeValue
  //     || camera.type === forthTypeValue
  //   ));
  //   preparedCameraList.push(...filterByTypeCameras);
  // }

  return preparedCameraList;
});

export {
  getCameras,
  getIsCamerasLoading,

  getSortedByPriceCameras,
  getMinAndMaxCameraPrices,

  getFilterCameras,
};
