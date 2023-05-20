import { Story } from '@storybook/react';

import { setFeatureFlags } from '@/shared/lib/features';
import { getAllFeatureFlag } from '@/shared/lib/features/lib/setGetFeatures';

export const NewDesignDecorator = (StoryComponent: Story) => {
  setFeatureFlags({ ...getAllFeatureFlag(), isAppRedesigned: true });

  return (
    <div className={`app_redesigned`}>
      <StoryComponent />
    </div>
  );
};
