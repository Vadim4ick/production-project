import { createAsyncThunk } from '@reduxjs/toolkit';

import { updateFeatureFlagsMutation } from '../api/featureFlagsApi';
import { getAllFeatureFlag, setFeatureFlags } from '../lib/setGetFeatures';

import { ThunkConfig } from '@/app/providers/StoreProvider';
import { FeatureFlags } from '@/shared/types/featureFlags';

interface UpdateFeatureFlagsOptions {
  userId: string;
  newFeatures: Partial<FeatureFlags>;
}

export const updateFeatureFlag = createAsyncThunk<
  void,
  UpdateFeatureFlagsOptions,
  ThunkConfig<string>
>('feature/updateFeatureFlag', async ({ userId, newFeatures }, thunkApi) => {
  const { dispatch, rejectWithValue } = thunkApi;

  try {
    await dispatch(
      updateFeatureFlagsMutation({
        userId,
        features: {
          ...getAllFeatureFlag(),
          ...newFeatures,
        },
      }),
    );

    setFeatureFlags({
      ...getAllFeatureFlag(),
      ...newFeatures,
    });

    window.location.reload();
  } catch (error) {
    console.log('error', error);
    return rejectWithValue('');
  }
});
