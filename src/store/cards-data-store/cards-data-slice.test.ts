import { makeFakeCards } from '../../utils/mocks';
import { fetchCamerasAction } from '../api-actions/card-actions';
import { cardsDataSlice } from './cards-data-slice';

describe('CardsData Slice', () => {
  const initialState = {
    cameras: [],
    isCamerasLoading: false,
  };
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = initialState;

    const result = cardsDataSlice.reducer(expectedState, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should return initialState with empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const expectedState = initialState;

    const result = cardsDataSlice.reducer(undefined, emptyAction);
    expect(result).toEqual(expectedState);
  });


  it('should set "isCamerasLoading" to "true",  with fetchCamerasAction.pending thunkAction',
    () => {
      const expectedIsCamerasLoading = true;
      const result = cardsDataSlice.reducer(undefined, fetchCamerasAction.pending);
      expect(result.isCamerasLoading).toBe(expectedIsCamerasLoading);
    }
  );
  it('should set "cameras" to array, "isCamerasLoading" to "false",  with fetchCamerasAction.fulfilled thunkAction',
    () => {
      const expectedIsCamerasLoading = false;
      const expectedCameras = makeFakeCards();

      const result = cardsDataSlice.reducer(undefined, fetchCamerasAction.fulfilled(expectedCameras, '', undefined));

      expect(result.isCamerasLoading).toBe(expectedIsCamerasLoading);
      expect(result.cameras).toEqual(expectedCameras);
    }
  );
  it('should set "isCamerasLoading" to "false",  with fetchCamerasAction.rejected thunkAction',
    () => {
      const expectedIsCamerasLoading = false;
      const result = cardsDataSlice.reducer(undefined, fetchCamerasAction.rejected);
      expect(result.isCamerasLoading).toBe(expectedIsCamerasLoading);
    }
  );

});

