import { makeFakeCards, makeFakeReviews, makeFakeSelectedCard, makeFakeSimilars } from '../../utils/mocks';
import { fetchCamerasAction, fetchSelectedCameraAction, fetchSimilars } from '../api-actions/card-actions';
import { fetchReviews } from '../api-actions/reviews-action';
import { appDataSlice, setErrorServerResponse } from './app-data-slice';

describe('app-data-slice', () => {
  const initialState = {
    errorServerResponse: null,
    hasErrorWithConnection: false,
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
