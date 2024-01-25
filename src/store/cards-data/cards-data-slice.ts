import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../consts';

import { TCard } from '../../types/generalTypes';
import { makeFakeCards } from '../../utils/mocks';

type TCardsDataState = {
  cameras: TCard[];
  isCamerasLoading: boolean;
}

const initialState: TCardsDataState = {
  cameras: makeFakeCards(),
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
