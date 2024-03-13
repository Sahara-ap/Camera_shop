import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './root-reducer';
import { createApi } from '../services/api';
import { saveToStorage } from '../services/localStorage';
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
  saveToStorage(store.getState()[NameSpace.Basket].basketList);
});

export default store;

