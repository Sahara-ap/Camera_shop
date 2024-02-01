import { combineReducers } from '@reduxjs/toolkit';

import { appDataSlice } from './app-data-store/app-data-slice';
import { bannerSlice } from './banner-store/banner-slice';
import { cardsDataSlice } from './cards-data-store/cards-data-slice';
import { modalWindowsSlice } from './modal-windows-store/modal-windows-slice';
import { selectedCardDataSlice } from './selected-card-data-store/selected-card-data-slice';

import { NameSpace } from '../consts';

const rootReducer = combineReducers({
  [NameSpace.App]: appDataSlice.reducer,
  [NameSpace.Banner]: bannerSlice.reducer,
  [NameSpace.Cards]: cardsDataSlice.reducer,
  [NameSpace.Modals]: modalWindowsSlice.reducer,
  [NameSpace.SelectedCard]: selectedCardDataSlice.reducer,
});

export {rootReducer};
