import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkAPI } from '../../types/store';
import { APIRoute } from '../../consts';
import { TCouponBody, TCouponResponse, TOrdersBody } from '../../types/general-types';


const postCoupon = createAsyncThunk<TCouponResponse, TCouponBody, ThunkAPI>(
  'basket/postCoupon',
  async (body, { extra: api }) => {
    const { data } = await api.post<TCouponResponse>(APIRoute.Coupons, body);
    return data;
  }
);


const postOrders = createAsyncThunk<void, TOrdersBody, ThunkAPI>(
  'basket/orders',
  async (body, {extra: api}) => {
    await api.post(APIRoute.Orders, body);
  }
);

export {
  postCoupon,
  postOrders,
};
