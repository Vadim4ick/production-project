import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Suspense } from 'react';

import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';

import { ArticleDetailsComments } from './ArticleDetailsComments';

export default {
  title: 'pages/ArticleDetailsPage/ArticleDetailsComments',
  component: ArticleDetailsComments,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ArticleDetailsComments>;

const Template: ComponentStory<typeof ArticleDetailsComments> = (args) => (
  <Suspense fallback={<div>Loading...</div>}>
    <ArticleDetailsComments {...args} />
  </Suspense>
);

export const Normal = Template.bind({});
Normal.args = {
  id: '1',
};
Normal.decorators = [StoreDecorator({})];
