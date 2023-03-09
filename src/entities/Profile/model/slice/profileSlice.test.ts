import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';

import { updateProfileData } from '../services/updateProfileData/updateProfileData';
import { ProfileSchema, ValidateProfileError } from '../types/profile';

import { profileActions, profileReducer } from './profileSlice';

const data = {
  first: 'Вадим',
  lastname: 'Фирулев',
  age: '19',
  currency: Currency.USD,
  country: Country.Russia,
  city: 'Пермь',
  username: 'admin',
};

describe('profileSlice.test', () => {
  test('test set readonly', () => {
    const state: DeepPartial<ProfileSchema> = { readonly: false };

    expect(
      profileReducer(state as ProfileSchema, profileActions.setReadonly(true)),
    ).toEqual({ readonly: true });
  });

  test('test cancel edit ', () => {
    const state: DeepPartial<ProfileSchema> = {
      data: data,
      form: { username: '' },
    };

    expect(
      profileReducer(state as ProfileSchema, profileActions.cancelEdit()),
    ).toEqual({ readonly: true, validateError: undefined, data, form: data });
  });

  test('test update profile', () => {
    const state: DeepPartial<ProfileSchema> = {
      form: { username: '123' },
    };

    expect(
      profileReducer(
        state as ProfileSchema,
        profileActions.updateProfile({ username: '123456' }),
      ),
    ).toEqual({
      form: { username: '123456' },
    });
  });

  test('test update profile service pending', () => {
    const state: DeepPartial<ProfileSchema> = {
      isLoading: false,
      validateError: [ValidateProfileError.SERVER_ERROR],
    };

    expect(
      profileReducer(state as ProfileSchema, updateProfileData.pending),
    ).toEqual({
      isLoading: true,
      validateError: undefined,
    });
  });

  test('test update profile service fulfilled', () => {
    const state: DeepPartial<ProfileSchema> = {
      isLoading: true,
    };

    expect(
      profileReducer(
        state as ProfileSchema,
        updateProfileData.fulfilled(data, ''),
      ),
    ).toEqual({
      isLoading: false,
      validateError: undefined,
      readonly: true,
      form: data,
      data: data,
    });
  });
});
