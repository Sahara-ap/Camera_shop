import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkAPI } from '../../types/store';
import { APIRoute } from '../../consts';
import { TCouponBody, TCouponResponse } from '../../types/general-types';


const postCoupon = createAsyncThunk<TCouponResponse, TCouponBody, ThunkAPI>(
  'basket/postCoupon',
  async(body, {extra: api}) => {
    const {data} = await api.post<TCouponResponse>(APIRoute.Coupons, body);
    return data;
  }
);

export {
  postCoupon,
};
