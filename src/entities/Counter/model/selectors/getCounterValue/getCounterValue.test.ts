import { StateSchema } from '@/app/providers/StoreProvider/config/StateSchema';
import { getCounterValue } from './getCounterValue';

describe('getCounterValue.test', () => {
  const state: DeepPartial<StateSchema> = {
    counter: { value: 10 },
  };

  test('counter value', () => {
    expect(getCounterValue(state as StateSchema)).toEqual(10);
  });
});
