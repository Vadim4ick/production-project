import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Notification } from '../../model/types/notification';

import { NotificationItem } from './NotificationItem';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

export default {
  title: 'entities/Notification/NotificationItem',
  component: NotificationItem,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof NotificationItem>;

const Template: ComponentStory<typeof NotificationItem> = (args) => (
  <NotificationItem {...args} />
);

const notification: Notification = {
  description: 'test body',
  id: '0',
  title: 'test title',
  date: '14.15.15',
};

export const Normal = Template.bind({});
Normal.args = {
  item: notification,
};
Normal.decorators = [StoreDecorator({})];
