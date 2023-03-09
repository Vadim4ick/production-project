import { StateSchema } from 'app/providers/StoreProvider';

import { ValidateProfileError } from '../../types/profile';

import { getProfileValidateErrors } from './getProfileValidateErrors';

describe('getProfileValidateError', () => {
  test('should return errors', () => {
    const state: DeepPartial<StateSchema> = {
      profile: {
        validateError: [
          ValidateProfileError.INCORRECT_AGE,
          ValidateProfileError.SERVER_ERROR,
        ],
      },
    };

    expect(getProfileValidateErrors(state as StateSchema)).toEqual([
      ValidateProfileError.INCORRECT_AGE,
      ValidateProfileError.SERVER_ERROR,
    ]);
  });

  test('should work empty state', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getProfileValidateErrors(state as StateSchema)).toEqual(undefined);
  });
});
