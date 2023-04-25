import { getLoginPassword } from './getLoginPassword';
import { StateSchema } from '@/app/providers/StoreProvider';

describe('getLoginPassword.test', () => {
  test('should return value', () => {
    const state: DeepPartial<StateSchema> = {
      loginForm: {
        username: '',
        password: '123',
        isLoading: false,
      },
    };

    expect(getLoginPassword(state as StateSchema)).toEqual('123');
  });

  test('should work width empty state', () => {
    const state: DeepPartial<StateSchema> = {};

    expect(getLoginPassword(state as StateSchema)).toEqual('');
  });
});
