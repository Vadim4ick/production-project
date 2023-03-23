import { LoginSchema } from '../types/loginSchema';

import { loginActions, loginReducer } from './loginSlice';

describe('loginSlice.test', () => {
  test('test set username', () => {
    const state: DeepPartial<LoginSchema> = { username: '321' };

    expect(
      loginReducer(state as LoginSchema, loginActions.setUsername('123')),
    ).toEqual({ username: '123' });
  });

  test('test set password', () => {
    const state: DeepPartial<LoginSchema> = { password: '321' };

    expect(
      loginReducer(state as LoginSchema, loginActions.setPassword('123')),
    ).toEqual({ password: '123' });
  });
});
