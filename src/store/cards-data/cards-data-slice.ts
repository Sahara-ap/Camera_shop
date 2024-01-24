import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../consts';

import { TCard } from '../../types/generalTypes';

type TCardsDataState = {
  cameras: TCard[];
  isCamerasLoading: boolean;
}

const initialState: TCardsDataState = {
  cameras: [],
  isCamerasLoading: false
};

const cardsDataSlice = createSlice({
  name: NameSpace.Cards,
  initialState,
  reducers: {},
});

export {
  cardsDataSlice,
};
