import { StateSchema } from 'app/providers/StoreProvider';

import { getProfileReadonly } from './getProfileReadonly';

describe('getProfileReadonly', () => {
  test('should return readonly', () => {
    const state: DeepPartial<StateSchema> = {
      profile: {
        readonly: true,
      },
    };

    expect(getProfileReadonly(state as StateSchema)).toEqual(true);
  });

  test('should work empty state', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getProfileReadonly(state as StateSchema)).toEqual(undefined);
  });
});
