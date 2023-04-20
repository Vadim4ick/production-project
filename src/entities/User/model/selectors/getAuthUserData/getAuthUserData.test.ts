import { StateSchema } from '@/app/providers/StoreProvider/config/StateSchema';

import { getAuthUserData } from './getAuthUserData';

describe('getAuthUserData', () => {
  test('should return authData value from user state', () => {
    const authData = {
      id: '1',
      username: 'Vadim',
    };

    const state: DeepPartial<StateSchema> = {
      user: {
        _inited: true,
        authData,
      },
    };

    const result = getAuthUserData(state as StateSchema);

    expect(result).toEqual(authData);
  });

  test('should return undefined when user state is undefined', () => {
    const state: DeepPartial<StateSchema> = {};

    const result = getAuthUserData(state as StateSchema);

    expect(result).toBeUndefined();
  });
});
