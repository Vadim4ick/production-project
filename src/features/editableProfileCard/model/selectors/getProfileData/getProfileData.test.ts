import { StateSchema } from '@/app/providers/StoreProvider';
import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';

import { getProfileData } from './getProfileData';

describe('getProfileData', () => {
  test('should return data', () => {
    const data = {
      first: 'Вадим',
      lastname: 'Фирулев',
      age: '19',
      currency: Currency.USD,
      country: Country.Russia,
      city: 'Пермь',
      username: 'admin',
    };

    const state: DeepPartial<StateSchema> = {
      profile: {
        data: data,
      },
    };

    expect(getProfileData(state as StateSchema)).toEqual(data);
  });

  test('should work empty state', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getProfileData(state as StateSchema)).toEqual(undefined);
  });
});
