import { ScrollRestorationSchema } from '../types/ScrollRestorationSchema';

import { scrollRestorationReducer } from './ScrollRestorationSlice';

describe('scrollRestorationSlice reducers', () => {
  const initialState: ScrollRestorationSchema = {
    scroll: {},
  };
  const action = {
    type: 'scrollRestorationSlice/setScrollPosition',
    payload: {
      path: 'somePath',
      position: 100,
    },
  };

  it('should set scroll position of a path', () => {
    const newState = scrollRestorationReducer(initialState, action);
    expect(newState.scroll.somePath).toEqual(100);
  });
});
