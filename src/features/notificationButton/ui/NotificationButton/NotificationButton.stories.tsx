import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Notification } from '@/entities/Notification/model/types/notification';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

import { NotificationButton } from './NotificationButton';

export default {
  title: 'features/NotificationButton',
  component: NotificationButton,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof NotificationButton>;

const Template: ComponentStory<typeof NotificationButton> = (args) => (
  <NotificationButton {...args} />
);

const notification: Notification = {
  description: 'test body',
  id: '0',
  title: 'test title',
};

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [StoreDecorator({})];
Normal.parameters = {
  mockData: [
    {
      url: __API__ + '/notifications',
      method: 'GET',
      status: 200,
      response: [
        { ...notification, id: '1' },
        { ...notification, id: '2' },
        { ...notification, id: '3' },
      ],
    },
  ],
};
