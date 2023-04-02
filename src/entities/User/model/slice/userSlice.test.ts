import { USER_LOCALSTORAGE_KEY } from 'shared/const/localstorage';

import { User, UserSchema } from '../types/user';

import { userReducer } from './userSlice';

describe('userSlice', () => {
  let initialState: UserSchema;

  beforeEach(() => {
    initialState = {
      _inited: true,
      authData: undefined,
    };
  });

  it('should setAuthData correctly', () => {
    const user: User = {
      id: '1',
      username: 'Test username',
    };
    const action = { type: 'user/setAuthData', payload: user };
    const nextState = userReducer(initialState, action);

    expect(nextState.authData).toEqual(user);
  });

  it('should initAuthData correctly', () => {
    const user: User = {
      id: '1',
      username: 'Test username',
    };

    localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(user));

    const action = { type: 'user/initAuthData' };
    const nextState = userReducer(initialState, action);

    expect(nextState.authData).toEqual(user);
    expect(nextState._inited).toEqual(true);
  });

  it('should logout correctly', () => {
    const action = { type: 'user/logout' };
    const nextState = userReducer(initialState, action);

    expect(nextState.authData).toBeUndefined();
  });
});
