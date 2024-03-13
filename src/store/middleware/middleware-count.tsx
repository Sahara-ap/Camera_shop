import { Action, Middleware, createAction } from '@reduxjs/toolkit';
import { saveToStorage } from '../../services/localStorage';
import { rootReducer } from '../root-reducer';
import { NameSpace } from '../../consts';

type Reducer = ReturnType<typeof rootReducer>
const saveToStorageAction = createAction('saveToStorageAction');

const middlewareLocalStorage: Middleware<unknown, Reducer> =
  (store) => (next) => (action: Action) => {

    if (action.type === 'saveToStorageAction') {
      const basketList = store.getState()[NameSpace.Basket].basketList;
      saveToStorage(basketList);
    } else {
      return next(action);
    }
  };

export {
  middlewareLocalStorage,
  saveToStorageAction,
};
