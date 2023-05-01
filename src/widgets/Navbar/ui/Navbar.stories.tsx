import { ComponentMeta, ComponentStory } from '@storybook/react';
import withMock from 'storybook-addon-mock';

import { Navbar } from './Navbar';
import { Notification } from '@/entities/Notification';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';

export default {
  title: 'widgets/Navbar',
  component: Navbar,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [withMock],
} as ComponentMeta<typeof Navbar>;

const notification: Notification = {
  description: 'test body',
  id: '0',
  title: 'test title',
  date: '14.15.15',
};

const Template: ComponentStory<typeof Navbar> = (args) => <Navbar {...args} />;

export const Light = Template.bind({});
Light.args = {};
Light.decorators = [StoreDecorator({})];

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator({})];

export const AuthNavbar = Template.bind({});
AuthNavbar.args = {};
AuthNavbar.decorators = [
  StoreDecorator({
    user: {
      authData: {
        id: 'test',
        username: 'test',
      },
    },
  }),
];
AuthNavbar.parameters = {
  mockData: [
    {
      url:
        __API__ +
        '/notifications?profileId=1&isRead=false&_sort=date&_order=desc',
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
