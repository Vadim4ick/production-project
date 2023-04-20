import { StateSchema } from '@/app/providers/StoreProvider';

import { getUserInited } from './getUserInited';

describe('getUserInited', () => {
  it('returns the value of user._inited from the provided state', () => {
    const state: DeepPartial<StateSchema> = { user: { _inited: true } };

    expect(getUserInited(state as StateSchema)).toBe(true);
  });
});
