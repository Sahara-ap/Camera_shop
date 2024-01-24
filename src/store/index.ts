import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './root-reducer';

const api = '';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      }
    }),
});

export default store;

