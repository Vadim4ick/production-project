import { JsonSettings } from '../model/types/jsonSettings';
import { User } from '../model/types/user';

import { rtkApi } from '@/shared/api/rtkApi';

interface SetJsonSettingsArg {
  userId: string;
  jsonSettings: JsonSettings;
}

const userApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    setJsonSettings: build.mutation<User, SetJsonSettingsArg>({
      query: (arg) => ({
        url: '/users/' + arg.userId,
        method: 'PATCH',
        body: {
          jsonSettings: arg.jsonSettings,
        },
      }),
    }),
    getUserDataById: build.query<User, string>({
      query: (userId) => ({
        url: '/users/' + userId,
        method: 'GET',
      }),
    }),
  }),
});

export const setJsonSettingsMutation =
  userApi.endpoints.setJsonSettings.initiate;

export const getUserDataByIdMutation =
  userApi.endpoints.getUserDataById.initiate;
