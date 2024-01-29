import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../consts';

type TSelectedCardState = {
  selectedCamera: TSelectedCardState | null;
  isSelectedCameraLoading: boolean;
}

const initialState: TSelectedCardState = {
  selectedCamera: null,
  isSelectedCameraLoading: false
};

const selectedCardDataSlice = createSlice({
  name: NameSpace.SelectedCard,
  initialState,
  reducers: {}
});

export {
  selectedCardDataSlice,

};
