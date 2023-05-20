import { ComponentMeta, ComponentStory } from '@storybook/react';

import { CommentCard } from './CommentCard';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

export default {
  title: 'entities/Comment/CommentCard',
  component: CommentCard,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof CommentCard>;

const Template: ComponentStory<typeof CommentCard> = (args) => (
  <CommentCard {...args} />
);

const NormalArgs = {
  id: '1',
  text: 'hello world',
  user: { id: '1', username: 'Vadim' },
};

export const Normal = Template.bind({});
Normal.args = {
  comment: NormalArgs,
};

export const NormalRedesign = Template.bind({});
NormalRedesign.args = {
  comment: NormalArgs,
};
NormalRedesign.decorators = [NewDesignDecorator];

export const Loading = Template.bind({});
Loading.args = {
  comment: {
    id: '1',
    text: 'hello world',
    user: { id: '1', username: 'Vadim' },
  },

  isLoading: true,
};
Loading.parameters = { loki: { skip: true } };
