import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Notification } from '../../model/types/notification';

import { NotificationList } from './NotificationList';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

export default {
  title: 'entities/Notification/NotificationList',
  component: NotificationList,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof NotificationList>;

const Template: ComponentStory<typeof NotificationList> = (args) => (
  <NotificationList {...args} />
);

const notification: Notification = {
  description: 'test body',
  id: '0',
  title: 'test title',
  date: '14.15.15',
};

export const Normal = Template.bind({});
Normal.args = {
  notifications: [
    { ...notification, id: '1' },
    { ...notification, id: '2' },
    { ...notification, id: '3' },
  ],
};
Normal.decorators = [StoreDecorator({})];
