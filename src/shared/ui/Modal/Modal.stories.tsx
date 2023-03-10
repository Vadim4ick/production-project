import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Theme } from 'app/providers/ThemeProvider';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Modal } from './Modal';

export default {
  title: 'shared/Modal',
  component: Modal,
  argTypes: {
    backgroundColor: { control: 'color' },
  },

  // parameters: {
  //   loki: {
  //     skip: true,
  //   },
  // },
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (args) => <Modal {...args} />;

export const ModalDark = Template.bind({});
ModalDark.args = {
  isOpen: true,
  children:
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, quoasdasds!',
};
ModalDark.decorators = [ThemeDecorator(Theme.DARK)];
// ModalDark.parameters = { loki: { skip: true } };

export const Primary = Template.bind({});
Primary.args = {
  isOpen: true,
  children:
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, quoasdasds!',
};
