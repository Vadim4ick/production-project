import { ComponentMeta, ComponentStory } from '@storybook/react';

import { CommentList } from './CommentList';

export default {
  title: 'entities/Comment/CommentList',
  component: CommentList,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof CommentList>;

const Template: ComponentStory<typeof CommentList> = (args) => (
  <CommentList {...args} />
);

export const Normal = Template.bind({});
Normal.args = {
  commets: [
    {
      id: '1',
      text: 'hello world',
      user: { id: '1', username: 'Vadim' },
    },
    {
      id: '2',
      text: 'Comment 2',
      user: { id: '2', username: 'Firulyov' },
    },
  ],
};

export const Loading = Template.bind({});
Loading.args = {
  commets: [],
  isLoading: true,
};
Loading.parameters = { loki: { skip: true } };
