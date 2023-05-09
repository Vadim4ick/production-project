import { createAsyncThunk } from '@reduxjs/toolkit';

import { getUserDataByIdMutation } from '../../api/userApi';
import { User } from '../types/user';

import { ThunkConfig } from '@/app/providers/StoreProvider';
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';

export const initAuthData = createAsyncThunk<User, void, ThunkConfig<string>>(
  'user/initAuthData',
  async (newJsonSettings, thunkApi) => {
    const { extra, rejectWithValue, getState, dispatch } = thunkApi;

    const userId = localStorage.getItem(USER_LOCALSTORAGE_KEY);

    if (!userId) {
      return rejectWithValue('');
    }

    try {
      const response = await dispatch(getUserDataByIdMutation(userId)).unwrap();

      return response;
    } catch (error) {
      console.log(error);
      return rejectWithValue('error');
    }
  },
);
