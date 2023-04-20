import { StateSchema } from '@/app/providers/StoreProvider/config/StateSchema';

import { getScrollRestorationByPath } from './scrollRestoration';

describe('getScrollRestorationByPath selector', () => {
  const state: DeepPartial<StateSchema> = {
    ui: {
      scroll: {
        '/path/1': 10,
        '/path/2': 20,
      },
    },
  };

  it('should return the scroll value for a given path', () => {
    expect(getScrollRestorationByPath(state as StateSchema, '/path/1')).toEqual(
      10,
    );
    expect(getScrollRestorationByPath(state as StateSchema, '/path/2')).toEqual(
      20,
    );
  });

  it('should return 0 for unknown paths', () => {
    expect(getScrollRestorationByPath(state as StateSchema, '/path/3')).toEqual(
      0,
    );
    expect(getScrollRestorationByPath(state as StateSchema, '/path/4')).toEqual(
      0,
    );
  });
});
