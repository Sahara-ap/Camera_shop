import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './root-reducer';
import { createApi } from '../services/api';
import { saveBasketToStorage, saveDiscountToStorage } from '../services/localStorage';
import { NameSpace } from '../consts';

const api = createApi();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      }
    }),
});

store.subscribe(() => {
  saveBasketToStorage(store.getState()[NameSpace.Basket].basketList);
  saveDiscountToStorage(store.getState()[NameSpace.Basket].discount);
});

export default store;

