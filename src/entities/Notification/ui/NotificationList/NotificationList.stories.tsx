import { ComponentMeta, ComponentStory } from '@storybook/react';
import withMock from 'storybook-addon-mock';

import { Notification } from '../../model/types/notification';

import { NotificationList } from './NotificationList';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

export default {
  title: 'entities/Notification/NotificationList',
  component: NotificationList,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [withMock],
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
Normal.args = {};
Normal.decorators = [StoreDecorator({})];
Normal.parameters = {
  mockData: [
    {
      url: __API__ + '/notifications?profileId=1&_sort=date&_order=desc',
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
