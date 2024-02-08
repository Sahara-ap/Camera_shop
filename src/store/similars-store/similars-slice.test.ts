import { makeFakeSimilars } from '../../utils/mocks';
import { fetchSimilars } from '../api-actions/card-actions';
import { similarsSlice } from './similars-slice';

describe('similars-slice', () => {
  const initialState = {
    similars: [],
    isSimilarsLoading: false,
  };
  describe('general tests', () => {
    it('should return initial state with empty action',
      () => {
        const emptyAction = { type: '' };
        const expectedResult = initialState;

        const result = similarsSlice.reducer(initialState, emptyAction);

        expect(result).toEqual(expectedResult);

      });
  });

  it('should return initial state with empty action and undefined state',
    () => {
      const emptyAction = { type: '' };
      const expectedResult = initialState;

      const result = similarsSlice.reducer(undefined, emptyAction);

      expect(result).toEqual(expectedResult);
    }
  );

  describe('extraReducers', () => {
    it('should set "isSimilarsLoading" to true with fetchSimilars.pending thunkAction',
      () => {
        const expectedResult = true;
        const result = similarsSlice.reducer(undefined, fetchSimilars.pending);
        expect(result.isSimilarsLoading).toBe(expectedResult);
      }
    );
    it('should set "isSimilarsLoading" to false with fetchSimilars.rejected thunkAction',
      () => {
        const expectedResult = false;
        const result = similarsSlice.reducer(undefined, fetchSimilars.rejected);
        expect(result.isSimilarsLoading).toBe(expectedResult);
      }
    );
    it('should set "isSimilarsLoading" to false and similars to payload value with fetchSimilars.fulfilled thunkAction',
      () => {
        const mokCameraId = '1';
        const expectedIsSimilarsLoading = false;
        const expectedSimilars = makeFakeSimilars();

        const result = similarsSlice.reducer(undefined, fetchSimilars.fulfilled(expectedSimilars, '', mokCameraId));

        expect(result.isSimilarsLoading).toBe(expectedIsSimilarsLoading);
        expect(result.similars).toEqual(expectedSimilars);
      }
    );
  });

});
