import { SortingOrder, SortingType } from '../../consts';
import { TCameraCategory, TCameraLevel, TCameraType } from '../../types/general-types';
import { makeFakeCards, makeFakeReviews, makeFakeSelectedCard, makeFakeSimilars } from '../../utils/mocks';
import { fetchCamerasAction, fetchSelectedCameraAction, fetchSimilars } from '../api-actions/card-actions';
import { fetchReviews } from '../api-actions/reviews-action';
import { appDataSlice, setCategoryFilterList, setErrorServerResponse, setLevelFilterList, setPriceMaxFilter, setPriceMinFilter, setSortOrder, setSortType, setTypeFilterList } from './app-data-slice';

describe('app-data-slice', () => {
  const initialState = {
    errorServerResponse: null,
    hasErrorWithConnection: false,

    priceMinFilter: '',
    priceMaxFilter: '',
    categoryFilterList: [],
    typeFilterList: [],
    levelFilterList: [],

    sortType: SortingType.Non,
    sortOrder: SortingOrder.Non,
  };
  describe('general tests', () => {
    it('should return initial state with empty action',
      () => {
        const emptyAction = { type: '' };
        const expectedResult = initialState;

        const result = appDataSlice.reducer(initialState, emptyAction);

        expect(result).toEqual(expectedResult);

      });
  });

  it('should return initial state with empty action and undefined state',
    () => {
      const emptyAction = { type: '' };
      const expectedResult = initialState;

      const result = appDataSlice.reducer(undefined, emptyAction);

      expect(result).toEqual(expectedResult);
    }
  );

  describe('reducers', () => {
    it('should set "errorServerResponse" to payload value with "setErrorServerResponse" action',
      () => {
        const expectResult = ('error');
        const result = appDataSlice.reducer(undefined, setErrorServerResponse(expectResult));
        expect(result.errorServerResponse).toBe(expectResult);
      }
    );
  });
  it('should set "priceMinFilter" to payloadValue with "setPriceMinFilter" action',
    () => {
      const expectedResult = '1';
      const result = appDataSlice.reducer(undefined, setPriceMinFilter(expectedResult));
      expect(result.priceMinFilter).toBe(expectedResult);
    }
  );
  it('should set "priceMaxFilter" to payloadValue with "setPriceMaxFilter" action',
    () => {
      const expectedResult = '100';
      const result = appDataSlice.reducer(undefined, setPriceMaxFilter(expectedResult));
      expect(result.priceMaxFilter).toBe(expectedResult);
    }
  );
  it('should set "categoryFilterList" to payloadValue with "setCategoryFilterList" action',
    () => {
      const expectedResult = ['Видеокамера'] as TCameraCategory[];
      const result = appDataSlice.reducer(undefined, setCategoryFilterList(expectedResult));
      expect(result.categoryFilterList).toEqual(expectedResult);
    }
  );
  it('should set "typeFilterList" to payloadValue with "setTypeFilterList" action',
    () => {
      const expectedResult = ['Коллекционная'] as TCameraType[];
      const result = appDataSlice.reducer(undefined, setTypeFilterList(expectedResult));
      expect(result.typeFilterList).toEqual(expectedResult);
    }
  );
  it('should set "levelFilterList" to payloadValue with "setLevelFilterList" action',
    () => {
      const expectedResult = ['Нулевой'] as TCameraLevel[];
      const result = appDataSlice.reducer(undefined, setLevelFilterList(expectedResult));
      expect(result.levelFilterList).toEqual(expectedResult);
    }
  );

  it('should set "sortType" to payloadValue with "setSortType" action',
    () => {
      const expectedResult = SortingType.Price;
      const result = appDataSlice.reducer(undefined, setSortType(expectedResult));
      expect(result.sortType).toBe(expectedResult);
    }
  );
  it('should set "sortOrder" to payloadValue with "setSortOrder" action',
    () => {
      const expectedResult = SortingOrder.Non;
      const result = appDataSlice.reducer(undefined, setSortOrder(expectedResult));
      expect(result.sortOrder).toBe(expectedResult);
    }
  );

  describe('extraReducers', () => {

    it('should set "hasErrorWithConnection" to true with fetchCamerasAction.rejected thunkAction',
      () => {
        const expectedResult = true;
        const result = appDataSlice.reducer(undefined, fetchCamerasAction.rejected);
        expect(result.hasErrorWithConnection).toBe(expectedResult);
      }
    );
    it('should set "hasErrorWithConnection" to false with fetchCamerasAction.fulfilled thunkAction',
      () => {
        const mockPayload = makeFakeCards();
        const expectedResult = false;

        const result = appDataSlice.reducer(undefined, fetchCamerasAction.fulfilled(mockPayload, '', undefined));

        expect(result.hasErrorWithConnection).toBe(expectedResult);
      }
    );

    it('should set "hasErrorWithConnection" to true with fetchSelectedCameraAction.rejected thunkAction',
      () => {
        const expectedResult = true;
        const result = appDataSlice.reducer(undefined, fetchSelectedCameraAction.rejected);
        expect(result.hasErrorWithConnection).toBe(expectedResult);
      }
    );
    it('should set "hasErrorWithConnection" to false with fetchSelectedCameraAction.fulfilled thunkAction',
      () => {
        const mokCameraId = '1';
        const mockPayload = makeFakeSelectedCard();
        const expectedResult = false;

        const result = appDataSlice.reducer(undefined, fetchSelectedCameraAction.fulfilled(mockPayload, '', mokCameraId));

        expect(result.hasErrorWithConnection).toBe(expectedResult);
      }
    );

    it('should set "hasErrorWithConnection" to true with fetchSimilars.rejected thunkAction',
      () => {
        const expectedResult = true;
        const result = appDataSlice.reducer(undefined, fetchSimilars.rejected);
        expect(result.hasErrorWithConnection).toBe(expectedResult);
      }
    );
    it('should set "hasErrorWithConnection" to false with fetchSimilars.fulfilled thunkAction',
      () => {
        const mokCameraId = '1';
        const mockPayload = makeFakeSimilars();
        const expectedResult = false;

        const result = appDataSlice.reducer(undefined, fetchSimilars.fulfilled(mockPayload, '', mokCameraId));

        expect(result.hasErrorWithConnection).toBe(expectedResult);
      }
    );

    it('should set "hasErrorWithConnection" to true with fetchReviews.rejected thunkAction',
      () => {
        const expectedResult = true;
        const result = appDataSlice.reducer(undefined, fetchReviews.rejected);
        expect(result.hasErrorWithConnection).toBe(expectedResult);
      }
    );
    it('should set "hasErrorWithConnection" to false with fetchReviews.fulfilled thunkAction',
      () => {
        const mokCameraId = '1';
        const mockPayload = makeFakeReviews();
        const expectedResult = false;

        const result = appDataSlice.reducer(undefined, fetchReviews.fulfilled(mockPayload, '', mokCameraId));

        expect(result.hasErrorWithConnection).toBe(expectedResult);
      }
    );
  });

});
