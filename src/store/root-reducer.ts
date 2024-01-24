import { combineReducers } from '@reduxjs/toolkit';

import { cardsDataSlice } from './cards-data/cards-data-slice';
import { selectedCardDataSlice } from './selected-card-data/selected-card-data-slice';
import { appDataSlice } from './app-data/app-data-slice';

import { NameSpace } from '../consts';

const rootReducer = combineReducers({
  [NameSpace.App]: appDataSlice.reducer,
  [NameSpace.Cards]: cardsDataSlice.reducer,
  [NameSpace.SelectedCard]: selectedCardDataSlice.reducer,
});

export {rootReducer};
