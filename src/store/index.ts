import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './root-reducer';
import { createApi } from '../services/api';
import { saveToStorage } from '../services/localStorage';
import { middlewareLocalStorage } from './middleware/middleware-count';

const api = createApi();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      }
    }).concat(middlewareLocalStorage),
});

// store.subscribe(() => {
//   saveToStorage(store.getState().BASKET.basketList);
// });

export default store;

