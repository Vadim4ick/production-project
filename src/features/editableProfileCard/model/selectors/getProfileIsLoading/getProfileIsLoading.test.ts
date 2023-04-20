import { StateSchema } from '@/app/providers/StoreProvider';

import { getProfileIsLoading } from './getProfileIsLoading';

describe('getProfileLoading', () => {
  test('should return loading', () => {
    const state: DeepPartial<StateSchema> = {
      profile: {
        isLoading: true,
      },
    };

    expect(getProfileIsLoading(state as StateSchema)).toEqual(true);
  });

  test('should work empty state', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getProfileIsLoading(state as StateSchema)).toEqual(undefined);
  });
});
