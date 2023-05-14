import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Icon } from './Icon';
import Avatar from '@/shared/assets/icons/about.svg';

export default {
  title: 'shared/Icon',
  component: Icon,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Icon>;

const Template: ComponentStory<typeof Icon> = (args) => <Icon {...args} />;

export const PrimaryInverted = Template.bind({});
PrimaryInverted.args = {
  Svg: Avatar,
  inverted: true,
};

export const Primary = Template.bind({});
Primary.args = {
  Svg: Avatar,
};
