import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Input } from './Input';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';

export default {
  title: 'shared/redesigned/Input',
  component: Input,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const Light = Template.bind({});
Light.args = {
  placeholder: 'Type text',
  value: '123',
};

export const Dark = Template.bind({});
Dark.args = {
  placeholder: 'Type text',
  value: '123',
};

Dark.decorators = [ThemeDecorator(Theme.DARK)];

export const DarkPassword = Template.bind({});
DarkPassword.args = {
  placeholder: 'Type password',
  value: '123',
  type: 'password',
};

DarkPassword.decorators = [ThemeDecorator(Theme.DARK)];
