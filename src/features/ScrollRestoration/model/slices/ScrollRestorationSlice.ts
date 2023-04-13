import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { ScrollRestorationSchema } from './../types/ScrollRestorationSchema';

const initialState: ScrollRestorationSchema = {
  scroll: {},

  idx: 0,
};

export const scrollRestorationSlice = createSlice({
  name: 'scrollRestorationSlice',
  initialState,
  reducers: {
    setScrollPosition: (
      state,
      action: PayloadAction<{ path: string; position: number }>,
    ) => {
      state.scroll[action.payload.path] = action.payload.position;
    },

    setScrollIndex: (state, action: PayloadAction<number>) => {
      state.idx = action.payload;
    },
  },
});

export const { actions: scrollRestorationActions } = scrollRestorationSlice;
export const { reducer: scrollRestorationReducer } = scrollRestorationSlice;
