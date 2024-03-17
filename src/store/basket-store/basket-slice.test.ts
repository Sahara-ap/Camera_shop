import { LoadingDataStatus } from '../../consts';
import { getBasketFromStorage, getCouponSendingStatusFromStorage, getCouponValueFromStorage, getDiscountFromStorage } from '../../services/localStorage';
import { TBasketCard } from '../../types/general-types';
import { makeFakeBasketItem, makeFakeSelectedCard } from '../../utils/mocks';
import { postCoupon, postOrders } from '../api-actions/basket-actions';
import { TBasketState, addItemToBasketList, basketSlice, decrementBasketItem, deleteBasketItem, incrementBasketItem, setBasketRemovedItem, setCouponSendingStatus, setCouponValue, setItemCount, setPostOrdersSendingStatusToUnsent } from './basket-slice';

describe('basket-slice', () => {
  const initialStateFromSlice = {
    basketList: getBasketFromStorage(),
    basketRemovedItem: null,

    discount: getDiscountFromStorage(),
    couponValue: getCouponValueFromStorage(),
    couponSendingStatus: getCouponSendingStatusFromStorage(),

    postOrdersSendingStatus: LoadingDataStatus.Unsent
  };

  let anyInitialState: TBasketState;
  beforeEach(() => {
    anyInitialState = {
      basketList: [],
      basketRemovedItem: makeFakeBasketItem(),

      discount: 15,
      couponValue: 'anyString',
      couponSendingStatus: LoadingDataStatus.Pending,

      postOrdersSendingStatus: LoadingDataStatus.Pending
    };
  });

  describe('general tests', () => {
    it('should return initialState that was passed to reducer with empty action',
      () => {
        const emptyAction = { type: '' };
        const expectedResult = anyInitialState;
        const result = basketSlice.reducer(anyInitialState, emptyAction);

        expect(result).toEqual(expectedResult);
      });
    it('should return initialState from Slice with empty action and undefined state',
      () => {
        const emptyAction = { type: '' };
        const result = basketSlice.reducer(undefined, emptyAction);

        expect(result).toEqual(initialStateFromSlice);
      });
  });


  describe('reducers', () => {
    it('with addItemToBasketList-action should add "count"-field to payloadValue and add this updatedPayloadCard to basketList',
      () => {
        const mockPayloadValue = makeFakeSelectedCard();
        const mockPayloadWithCountField = { ...mockPayloadValue, ...{ count: 1 } };
        const expectedResult = Array.from({ length: 1 }, () => mockPayloadWithCountField);

        const actualResult = basketSlice.reducer(anyInitialState, addItemToBasketList(mockPayloadValue));
        expect(actualResult.basketList).toEqual(expectedResult);
      });
    it('with "deleteBasketItem" action should delete value from basketList includes payloadCardId',
      () => {
        const mockPayloadCardId = 1;
        const mockFirstBasketItem = { ...makeFakeBasketItem(), ...{ id: 1 } };
        const mockSecondBasketItem = { ...makeFakeBasketItem(), ...{ id: 2 } };

        const mockState = {
          basketList: [mockFirstBasketItem, mockSecondBasketItem],
          basketRemovedItem: null,

          discount: 15,
          couponValue: 'anyString',
          couponSendingStatus: LoadingDataStatus.Pending,

          postOrdersSendingStatus: LoadingDataStatus.Pending
        };
        const expectedResult = [mockSecondBasketItem];


        const actualResult = basketSlice.reducer(mockState, deleteBasketItem(mockPayloadCardId));
        expect(actualResult.basketList).toEqual(expectedResult);
      });
    it(' with "decrementBasketItem" action  should decrement "count" field by 1 for the basketList element that includes payloadCardId',
      () => {
        const mockPayloadCardId = 1;
        const mockFirstBasketItem = { ...makeFakeBasketItem(), ...{ id: 1, count: 2 } };
        const mockSecondBasketItem = { ...makeFakeBasketItem(), ...{ id: 2, count: 2 } };

        const mockState = {
          basketList: [mockFirstBasketItem, mockSecondBasketItem],
          basketRemovedItem: null,

          discount: 15,
          couponValue: 'anyString',
          couponSendingStatus: LoadingDataStatus.Pending,

          postOrdersSendingStatus: LoadingDataStatus.Pending
        };

        const expectedFirstBasketItem = { ...mockFirstBasketItem, ...{ id: 1, count: 1 } };
        const expectedSecondBasketItem = mockSecondBasketItem;
        const expectedResult = [expectedFirstBasketItem, expectedSecondBasketItem];

        const actualBasketList = basketSlice.reducer(mockState, decrementBasketItem({ id: mockPayloadCardId, count: 1 }));

        expect(actualBasketList.basketList).toEqual(expectedResult);
      });
    it(' with "incrementBasketItem" action  should increment "count" field by 1 for the basketList element that includes payloadCardId',
      () => {
        const mockPayloadCardId = 1;
        const mockFirstBasketItem = { ...makeFakeBasketItem(), ...{ id: 1, count: 2 } };
        const mockSecondBasketItem = { ...makeFakeBasketItem(), ...{ id: 2, count: 2 } };

        const mockState = {
          basketList: [mockFirstBasketItem, mockSecondBasketItem],
          basketRemovedItem: null,

          discount: 15,
          couponValue: 'anyString',
          couponSendingStatus: LoadingDataStatus.Pending,

          postOrdersSendingStatus: LoadingDataStatus.Pending
        };

        const expectedFirstBasketItem = { ...mockFirstBasketItem, ...{ id: 1, count: 3 } };
        const expectedSecondBasketItem = mockSecondBasketItem;
        const expectedResult = [expectedFirstBasketItem, expectedSecondBasketItem];

        const actualBasketList = basketSlice.reducer(mockState, incrementBasketItem({ id: mockPayloadCardId, count: 1 }));

        expect(actualBasketList.basketList).toEqual(expectedResult);
      });
    it(' with "setItemCount" action should set "count" field to payloadCountValue for the basketList element that includes payloadCardId',
      () => {
        const mockPayloadCountValue = '5';
        const mockPayloadCardId = 1;
        const mockFirstBasketItem = { ...makeFakeBasketItem(), ...{ id: 1, count: 2 } };
        const mockSecondBasketItem = { ...makeFakeBasketItem(), ...{ id: 2, count: 2 } };

        const mockState = {
          basketList: [mockFirstBasketItem, mockSecondBasketItem],
          basketRemovedItem: null,

          discount: 15,
          couponValue: 'anyString',
          couponSendingStatus: LoadingDataStatus.Pending,

          postOrdersSendingStatus: LoadingDataStatus.Pending
        };

        const expectedFirstBasketItem = { ...mockFirstBasketItem, ...{ id: 1, count: 5 } };
        const expectedSecondBasketItem = mockSecondBasketItem;
        const expectedResult = [expectedFirstBasketItem, expectedSecondBasketItem];

        const actualBasketList = basketSlice.reducer(mockState, setItemCount({ id: mockPayloadCardId, count: mockPayloadCountValue }));

        expect(actualBasketList.basketList).toEqual(expectedResult);
      });

    it('with "setBasketRemovedItem" action should set basketRemovedItem to payloadCardValue',
      () => {
        const mockPayloadCardValue = makeFakeBasketItem();

        const expectedResult = mockPayloadCardValue;
        const actualResult = basketSlice.reducer(undefined, setBasketRemovedItem(mockPayloadCardValue));

        expect(actualResult.basketRemovedItem).toEqual(expectedResult);
      }
    );
    it('with "setCouponSendingStatus" action should set couponSendingStatus to payloadValue',
      () => {
        const mockPayloadValue = LoadingDataStatus.Success;

        const expectedResult = mockPayloadValue;
        const actualResult = basketSlice.reducer(undefined, setCouponSendingStatus(mockPayloadValue));

        expect(actualResult.couponSendingStatus).toBe(expectedResult);
      }
    );
    it('with "setCouponValue" action should set couponValue to payloadValue',
      () => {
        const mockPayloadValue = 'I want to get discount';

        const expectedResult = mockPayloadValue;
        const actualResult = basketSlice.reducer(undefined, setCouponValue(mockPayloadValue));

        expect(actualResult.couponValue).toBe(expectedResult);
      }
    );
    it('with "setPostOrdersSendingStatusToUnsent" action should set postOrdersSendingStatus to "UNSENT"',
      () => {
        const expectedResult = LoadingDataStatus.Unsent;
        const actualResult = basketSlice.reducer(undefined, setPostOrdersSendingStatusToUnsent());

        expect(actualResult.postOrdersSendingStatus).toBe(expectedResult);
      }
    );
  });


  describe('extraReducers', () => {
    it('with "postCoupon.pending" thunkAction should set "couponSendingStatus" to "PENDING"',
      () => {
        const expectedResult = LoadingDataStatus.Pending;
        const result = basketSlice.reducer(undefined, postCoupon.pending);
        expect(result.couponSendingStatus).toBe(expectedResult);
      });
    it('with "postCoupon.rejected" thunkAction should set "couponSendingStatus" to "ERROR"',
      () => {
        const expectedResult = LoadingDataStatus.Error;
        const result = basketSlice.reducer(undefined, postCoupon.rejected);
        expect(result.couponSendingStatus).toBe(expectedResult);
      });
    it(`with "postCoupon.fulfilled" thunkAction
          should set "couponSendingStatus" to "SUCCESS"
          should set "discount" to payloadValue/100`, () => {
      const mockServerResponse = 15;
      const mockBody = { coupon: 'anyString' };

      const expectedCouponSendingStatus = LoadingDataStatus.Success;
      const expectedDiscount = mockServerResponse / 100;
      const result = basketSlice.reducer(undefined, postCoupon.fulfilled(mockServerResponse, '', mockBody));
      expect(result.couponSendingStatus).toBe(expectedCouponSendingStatus);
      expect(result.discount).toBe(expectedDiscount);
    });


    it('with "postOrders.pending" thunkAction should set "postOrdersSendingStatus" to "PENDING"',
      () => {
        const expectedResult = LoadingDataStatus.Pending;
        const result = basketSlice.reducer(undefined, postOrders.pending);
        expect(result.postOrdersSendingStatus).toBe(expectedResult);
      });
    it('with "postOrders.rejected" thunkAction should set "postOrdersSendingStatus" to "ERROR"',
      () => {
        const expectedResult = LoadingDataStatus.Error;
        const result = basketSlice.reducer(undefined, postOrders.rejected);
        expect(result.postOrdersSendingStatus).toBe(expectedResult);
      });
    it(`with "postOrders.fulfilled" thunkAction
          should set "postOrdersSendingStatus" to "SUCCESS"
          should set "basketList" to []
          should set "discount" to 0
          should set "couponSendingStatus" to "UNSENT"
          should set "couponValue" to ""`, () => {

      const mockBody = { camerasIds: [], coupon: 'camera-333' };

      const expectedPostOrdersSendingStatus = LoadingDataStatus.Success;
      const expectedBasketList = [] as TBasketCard[];
      const expectedDiscount = 0;
      const expectedCouponSendingStatus = LoadingDataStatus.Unsent;
      const expectedCouponValue = '';


      const result = basketSlice.reducer(undefined, postOrders.fulfilled(undefined, '', mockBody));

      expect(result.postOrdersSendingStatus).toBe(expectedPostOrdersSendingStatus);
      expect(result.basketList).toEqual(expectedBasketList);
      expect(result.discount).toBe(expectedDiscount);
      expect(result.couponSendingStatus).toBe(expectedCouponSendingStatus);
      expect(result.couponValue).toBe(expectedCouponValue);
    });

  });

});
