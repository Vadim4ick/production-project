import { ComponentMeta, ComponentStory } from '@storybook/react';

import { AppImage } from './AppImage';

export default {
  title: 'shared/redesigned/AppImage',
  component: AppImage,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof AppImage>;

const Template: ComponentStory<typeof AppImage> = (args) => (
  <AppImage {...args} />
);

export const Normal = Template.bind({});
Normal.args = {
  src: 'https://kolchvesti.ru/wp-content/uploads/2021/07/haker.jpg',
};
