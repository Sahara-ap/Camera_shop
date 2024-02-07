import { modalWindowsSlice, setIsBuyProductActive, setIsReviewModalActive, setIsReviewModalSuccessActive } from './modal-windows-slice';

describe('modal-windows-slice', () => {
  const initialState = {
    isBuyProductActive: false,
    productData: null,

    isReviewModalActive: false,
    isReviewModalSuccessActive: false,
  };
  it('should return initial state with empty action',
    () => {
      const emptyAction = { type: '' };
      const expectedState = initialState;

      const result = modalWindowsSlice.reducer(expectedState, emptyAction);
      expect(result).toEqual(initialState);
    });
  it('should return initial state with empty action and undefined state',
    () => {
      const emptyAction = { type: '' };
      const expectedState = initialState;

      const result = modalWindowsSlice.reducer(undefined, emptyAction);
      expect(result).toEqual(expectedState);
    });

  it('should set "isBuyProductActive" to payload value with setIsBuyProductActive action',
    () => {
      const expectedIsBuyProductActive = true;
      const result = modalWindowsSlice.reducer(undefined, setIsBuyProductActive(true));

      expect(result.isBuyProductActive).toBe(expectedIsBuyProductActive);
    });

  it('should set "isReviewModalActive" to payload value with setIsReviewModalActive action',
    () => {
      const expectedResult = true;
      const result = modalWindowsSlice.reducer(undefined, setIsReviewModalActive(true));

      expect(result.isReviewModalActive).toBe(expectedResult);
    });

  it('should set "isReviewModalSuccessActive" to payload value with setIsReviewModalSuccessActive action',
    () => {
      const expectedResult = true;
      const result = modalWindowsSlice.reducer(undefined, setIsReviewModalSuccessActive(true));

      expect(result.isReviewModalSuccessActive).toBe(expectedResult);
    });

});
