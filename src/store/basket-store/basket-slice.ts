/* eslint-disable no-useless-return */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TBasketCard, TCouponResponse, TSelectedCard } from '../../types/general-types';
import { LoadingDataStatus, NameSpace } from '../../consts';
import { getBasketFromStorage, getCouponSendingStatusFromStorage, getCouponValueFromStorage, getDiscountFromStorage } from '../../services/localStorage';
import { postCoupon, postOrders } from '../api-actions/basket-actions';

type TBasketState = {
  basketList: TBasketCard[];
  setBasketRemoveItem: TBasketCard | null;

  discount: TCouponResponse;
  couponValue: string;
  couponSendingStatus: LoadingDataStatus;

  postOrdersSendingStatus: LoadingDataStatus;
}
const initialState: TBasketState = {
  basketList: getBasketFromStorage(),
  setBasketRemoveItem: null,

  discount: getDiscountFromStorage(),
  couponValue: getCouponValueFromStorage(),
  couponSendingStatus: getCouponSendingStatusFromStorage(),

  postOrdersSendingStatus: LoadingDataStatus.Unsent
};
const basketSlice = createSlice({
  name: NameSpace.Basket,
  initialState,
  reducers: {
    addItemToBasketList: (state, action: PayloadAction<TSelectedCard>) => {
      const card = action.payload;
      const addCountFieldToCard = () => ({
        ...card,
        count: 1,
      });

      let isInList = false;
      const payloadCameraId = card.id;
      const index = state.basketList.findIndex((camera) => camera.id === payloadCameraId);

      isInList = index >= 0;
      if (!isInList) {
        const extendedCard = addCountFieldToCard();
        state.basketList.push(extendedCard);
      } else {
        state.basketList[index].count += 1;
      }
    },

    dropBasketList: (state) => {
      state.basketList = [];
    },
    deleteBasketItem: (state, action: PayloadAction<TBasketCard['id']>) => {
      const deletedCardId = action.payload;
      const result = state.basketList.filter((card) => card.id !== deletedCardId);
      state.basketList = result;
    },
    decrementBasketItem: (state, action: PayloadAction<{ id: TBasketCard['id']; count: number }>) => {
      const index = state.basketList.findIndex((camera) => camera.id === action.payload.id);
      const stateCount = state.basketList[index].count;
      if (stateCount === 1) {
        return;
      } else {
        state.basketList[index].count -= action.payload.count;
      }
    },
    incrementBasketItem: (state, action: PayloadAction<{ id: TBasketCard['id']; count: number }>) => {
      const index = state.basketList.findIndex((camera) => camera.id === action.payload.id);
      const stateCount = state.basketList[index].count;
      if (stateCount === 99) {
        return;
      } else {
        state.basketList[index].count += action.payload.count;
      }
    },
    setItemCount: (state, action: PayloadAction<{ id: TBasketCard['id']; count: string }>) => {
      const formatedCount = Number(action.payload.count);
      let result = formatedCount;
      if (formatedCount > 99) {
        result = 99;
      }
      if (formatedCount < 1) {
        result = 1;
      }

      const index = state.basketList.findIndex((camera) => camera.id === action.payload.id);
      state.basketList[index].count = result;
    },

    setBasketRemoveItem: (state, action: PayloadAction<TBasketCard>) => {
      state.setBasketRemoveItem = action.payload;
    },

    setCouponSendingStatus: (state, action: PayloadAction<LoadingDataStatus>) => {
      state.couponSendingStatus = action.payload;
    },
    setCouponValue: (state, action: PayloadAction<string>) => {
      state.couponValue = action.payload;
    },

    setPostOrdersSendingStatusToUnsent: (state) => {
      state.postOrdersSendingStatus = LoadingDataStatus.Unsent;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(postCoupon.pending, (state) => {
        state.couponSendingStatus = LoadingDataStatus.Pending;
      })
      .addCase(postCoupon.fulfilled, (state, action) => {
        state.couponSendingStatus = LoadingDataStatus.Success;
        state.discount = action.payload / 100;
      })
      .addCase(postCoupon.rejected, (state) => {
        state.couponSendingStatus = LoadingDataStatus.Error;
        state.discount = 0;
      })
      .addCase(postOrders.pending, (state) => {
        state.postOrdersSendingStatus = LoadingDataStatus.Pending;
      })
      .addCase(postOrders.fulfilled, (state) => {
        state.postOrdersSendingStatus = LoadingDataStatus.Success;
      })
      .addCase(postOrders.rejected, (state) => {
        state.postOrdersSendingStatus = LoadingDataStatus.Error;
      });

  }
});

const { addItemToBasketList, dropBasketList, deleteBasketItem, decrementBasketItem, incrementBasketItem, setItemCount, setBasketRemoveItem, setCouponSendingStatus, setCouponValue, setPostOrdersSendingStatusToUnsent,} = basketSlice.actions;

export {
  basketSlice,

  addItemToBasketList,
  dropBasketList,
  deleteBasketItem,
  decrementBasketItem,
  incrementBasketItem,
  setItemCount,

  setBasketRemoveItem,
  setCouponSendingStatus,
  setCouponValue,
  setPostOrdersSendingStatusToUnsent,
};
