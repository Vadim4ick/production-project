import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Button } from '../../../Button/Button';

import { Popover } from './Popover';

export default {
  title: 'shared/redesigned/Popover',
  component: Popover,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '150px', display: 'table' }}>{<Story />}</div>
    ),
  ],
} as ComponentMeta<typeof Popover>;

const Template: ComponentStory<typeof Popover> = (args) => (
  <Popover {...args} />
);

export const PopoverBottomRight = Template.bind({});
PopoverBottomRight.args = {
  trigger: <Button>Open</Button>,
  children: 'Hello world',
  direction: 'bottom right',
};
export const PopoverBottomLeft = Template.bind({});
PopoverBottomLeft.args = {
  trigger: <Button>Open</Button>,
  children: 'Hello world',
  direction: 'bottom left',
};

export const PopoverTopLeft = Template.bind({});
PopoverTopLeft.args = {
  trigger: <Button>Open</Button>,
  children: 'Hello world',
  direction: 'top left',
};

export const PopoverTopRight = Template.bind({});
PopoverTopRight.args = {
  trigger: <Button>Open</Button>,
  children: 'Hello world',
  direction: 'top right',
};
