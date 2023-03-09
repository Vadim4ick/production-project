import { StateSchema } from 'app/providers/StoreProvider';
import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';

import { getProfileForm } from './getProfileForm';

describe('getProfileForm', () => {
  const data = {
    first: 'Вадим',
    lastname: 'Фирулев',
    age: '19',
    currency: Currency.USD,
    country: Country.Russia,
    city: 'Пермь',
    username: 'admin',
  };

  test('should return form', () => {
    const state: DeepPartial<StateSchema> = {
      profile: {
        form: data,
      },
    };

    expect(getProfileForm(state as StateSchema)).toEqual(data);
  });

  test('should work empty state', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getProfileForm(state as StateSchema)).toEqual(undefined);
  });
});
