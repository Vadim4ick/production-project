import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Theme } from '@/app/providers/ThemeProvider';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import LoginForm from './LoginForm';

export default {
  title: 'features/LoginForm',
  component: LoginForm,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof LoginForm>;

const Template: ComponentStory<typeof LoginForm> = (args) => (
  <LoginForm {...args} />
);

export const Light = Template.bind({});
Light.args = {};
Light.decorators = [
  StoreDecorator({
    loginForm: { username: '123', password: 'test', isLoading: false },
  }),
];

export const LightError = Template.bind({});
LightError.args = {};
LightError.decorators = [
  StoreDecorator({
    loginForm: {
      username: '123',
      password: 'test',
      error: 'ERROR',
      isLoading: false,
    },
  }),
];

export const LoadingDark = Template.bind({});
LoadingDark.args = {};
LoadingDark.decorators = [
  ThemeDecorator(Theme.DARK),
  StoreDecorator({
    loginForm: { username: '123', password: 'test', isLoading: true },
  }),
];

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [
  ThemeDecorator(Theme.DARK),
  StoreDecorator({
    loginForm: { username: '123', password: 'test', isLoading: false },
  }),
];
