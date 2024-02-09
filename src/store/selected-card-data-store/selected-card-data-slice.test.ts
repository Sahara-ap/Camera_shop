import { expect } from 'vitest';
import { makeFakeSelectedCard } from '../../utils/mocks';
import { fetchSelectedCameraAction } from '../api-actions/card-actions';
import { selectedCardDataSlice, setSelectedCamera } from './selected-card-data-slice';

describe('selected-card-data-slice', () => {
  const initialState = {
    selectedCamera: null,
    isSelectedCameraLoading: false
  };
  describe('general tests', () => {
    it('should return initial state with empty action',
      () => {
        const emptyAction = { type: '' };
        const expectedResult = initialState;

        const result = selectedCardDataSlice.reducer(initialState, emptyAction);

        expect(result).toEqual(expectedResult);

      });
  });

  it('should return initial state with empty action and undefined state',
    () => {
      const emptyAction = { type: '' };
      const expectedResult = initialState;

      const result = selectedCardDataSlice.reducer(undefined, emptyAction);

      expect(result).toEqual(expectedResult);
    }
  );

  describe('reducers tests', () => {
    it('should set "selectedCamera" to payload value with "setSelectedCamera" action',
      () => {
        const expectResult = makeFakeSelectedCard();
        const result = selectedCardDataSlice.reducer(undefined, setSelectedCamera(expectResult));
        expect(result.selectedCamera).toEqual(expectResult);
      }
    );
  });

  describe('extraReducers', () => {
    it('should set "isSelectedCameraLoading" to true with fetchSelectedCameraAction.pending thunkAction',
      () => {
        const expectedResult = true;
        const result = selectedCardDataSlice.reducer(undefined, fetchSelectedCameraAction.pending);
        expect(result.isSelectedCameraLoading).toBe(expectedResult);
      }
    );
    it('should set "isSelectedCameraLoading" to false with fetchSelectedCameraAction.rejected thunkAction',
      () => {
        const expectedResult = false;
        const result = selectedCardDataSlice.reducer(undefined, fetchSelectedCameraAction.rejected);
        expect(result.isSelectedCameraLoading).toBe(expectedResult);
      }
    );
    it('should set "isSelectedCameraLoading" to false and selectedCamera to payload value with fetchSelectedCameraAction.fulfilled thunkAction',
      () => {
        const mokCameraId = '1';
        const expectedIsSelectedCameraLoading = false;
        const expectedSelectedCamera = makeFakeSelectedCard();

        const result = selectedCardDataSlice.reducer(undefined, fetchSelectedCameraAction.fulfilled(expectedSelectedCamera, '', mokCameraId));

        expect(result.isSelectedCameraLoading).toBe(expectedIsSelectedCameraLoading);
        expect(result.selectedCamera).toEqual(expectedSelectedCamera);
      }
    );
  });

});
