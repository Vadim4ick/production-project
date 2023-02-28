import { getLoginIsLoading } from './getLoginLoading';
import { StateSchema } from 'app/providers/StoreProvider/config/StateSchema';
import { DeepPartial } from '@reduxjs/toolkit';

describe('getLoginIsLoading.test', () => {
  test('should return true', () => {
    const state: DeepPartial<StateSchema> = {
      loginForm: {
        username: '',
        password: '',
        isLoading: true,
      },
    };

    expect(getLoginIsLoading(state as StateSchema)).toEqual(true);
  });

  test('should work width empty state', () => {
    const state: DeepPartial<StateSchema> = {};

    expect(getLoginIsLoading(state as StateSchema)).toEqual(false);
  });
});
