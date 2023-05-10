import { ReactElement } from 'react';

import { getFeatureFlag } from './setGetFeatures';
import { FeatureFlags } from '@/shared/types/featureFlags';

interface ToggleFeatures {
  feature: keyof FeatureFlags;
  on: ReactElement;
  off: ReactElement;
}

export function ToggleFeatures(props: ToggleFeatures) {
  const { feature, on, off } = props;

  if (getFeatureFlag(feature)) {
    return on;
  }

  return off;
}
