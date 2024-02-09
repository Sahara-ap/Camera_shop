import { makeFakeBanners } from '../../utils/mocks';
import { fetchBannerAction } from '../api-actions/banner-action';
import { bannerSlice } from './banner-slice';

describe('banner-slice', () => {
  const initialState = {
    bannerCards: [],
    isBannerCardLoading: false,
    isBannerError: false
  };

  describe('general tests', () => {
    it('should return initial state with empty action',
      () => {
        const emptyAction = { type: '' };
        const expectedResult = initialState;

        const result = bannerSlice.reducer(initialState, emptyAction);

        expect(result).toEqual(expectedResult);

      });
  });

  it('should return initial state with empty action and undefined state',
    () => {
      const emptyAction = { type: '' };
      const expectedResult = initialState;

      const result = bannerSlice.reducer(undefined, emptyAction);

      expect(result).toEqual(expectedResult);
    }
  );


  describe('extraReducers', () => {
    it('should set "isBannerCardLoading" to true and "isBannerError" to false with fetchBannerAction.pending thunkAction',
      () => {
        const expectedIsBannerCardLoading = true;
        const expectedIsBannerError = false;

        const result = bannerSlice.reducer(undefined, fetchBannerAction.pending);
        expect(result.isBannerCardLoading).toBe(expectedIsBannerCardLoading);
        expect(result.isBannerError).toBe(expectedIsBannerError);
      }
    );
    it('should set "isBannerCardLoading" to true and "isBannerError" to false with fetchBannerAction.rejected thunkAction',
      () => {
        const expectedIsBannerCardLoading = false;
        const expectedIsBannerError = true;

        const result = bannerSlice.reducer(undefined, fetchBannerAction.rejected);
        expect(result.isBannerCardLoading).toBe(expectedIsBannerCardLoading);
        expect(result.isBannerError).toBe(expectedIsBannerError);
      }
    );
    it('should set "isBannerCardLoading" to false  and "isBannerError" to false and "bannerCards" to payload value with with fetchBannerAction.fulfilled thunkAction',
      () => {
        const expectedIsBannerCardLoading = false;
        const expectedIsBannerError = false;
        const expectedBannerCards = makeFakeBanners();

        const result = bannerSlice.reducer(undefined, fetchBannerAction.fulfilled(expectedBannerCards, '', undefined));

        expect(result.isBannerCardLoading).toBe(expectedIsBannerCardLoading);
        expect(result.isBannerError).toBe(expectedIsBannerError);
        expect(result.bannerCards).toEqual(expectedBannerCards);
      }
    );
  });

});
