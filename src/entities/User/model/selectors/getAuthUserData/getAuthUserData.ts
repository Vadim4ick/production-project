import { StateSchema } from '@/app/providers/StoreProvider';

export const getAuthUserData = (state: StateSchema) => {
  return state.user?.authData;
};
