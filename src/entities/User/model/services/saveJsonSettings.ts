import { createAsyncThunk } from '@reduxjs/toolkit';

import { setJsonSettingsMutation } from '../../api/userApi';
import { getAuthUserData } from '../selectors/getAuthUserData/getAuthUserData';
import { getJsonSettings } from '../selectors/jsonSettings';
import { JsonSettings } from '../types/jsonSettings';

import { ThunkConfig } from '@/app/providers/StoreProvider';

export const saveJsonSettings = createAsyncThunk<
  JsonSettings,
  JsonSettings,
  ThunkConfig<string>
>('user/saveJsonSettings', async (newJsonSettings, thunkApi) => {
  const { extra, rejectWithValue, getState, dispatch } = thunkApi;
  const userData = getAuthUserData(getState());
  const currentSettings = getJsonSettings(getState());

  if (!userData) {
    return rejectWithValue('');
  }

  try {
    const response = await dispatch(
      setJsonSettingsMutation({
        userId: userData.id,
        jsonSettings: {
          ...currentSettings,
          ...newJsonSettings,
        },
      }),
    ).unwrap();

    if (!response.jsonSettings) {
      return rejectWithValue('');
    }

    return response.jsonSettings;
  } catch (error) {
    console.log(error);
    return rejectWithValue('error');
  }
});
