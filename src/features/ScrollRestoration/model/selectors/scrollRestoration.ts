import { createSelector } from '@reduxjs/toolkit';

import { StateSchema } from '@/app/providers/StoreProvider/config/StateSchema';

export const getScrollRestoration = (state: StateSchema) => state.ui.scroll;
export const getScrollIndex = (state: StateSchema) => state.ui.idx ?? 0;

export const getScrollRestorationByPath = createSelector(
  getScrollRestoration,
  (state: StateSchema, path: string) => path,
  (scroll, path) => scroll[path] || 0,
);
