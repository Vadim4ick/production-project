import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Icon } from './Icon';
import Avatar from '@/shared/assets/icons/about.svg';

export default {
  title: 'shared/redesigned/Icon',
  component: Icon,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Icon>;

const Template: ComponentStory<typeof Icon> = (args) => <Icon {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  Svg: Avatar,
};
