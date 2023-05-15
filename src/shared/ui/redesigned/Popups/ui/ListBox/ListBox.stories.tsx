import { ComponentMeta, ComponentStory } from '@storybook/react';

import { ListBox } from './ListBox';

export default {
  title: 'shared/redesigned/ListBox',
  component: ListBox,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: 100 }}>
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof ListBox>;

const Template: ComponentStory<typeof ListBox> = (args) => (
  <ListBox {...args} />
);

export const NormalBottomLeft = Template.bind({});
NormalBottomLeft.args = {
  direction: 'bottom left',
  label: 'Выберете',
  items: [
    { value: 'one', content: 'one' },
    { value: 'two', content: 'two', disabled: true },
    { value: 'three', content: 'three' },
  ],

  defaultValue: 'Выберете',
};

export const NormalBottomRight = Template.bind({});
NormalBottomRight.args = {
  direction: 'bottom right',
  label: 'Выберете',
  items: [
    { value: 'one', content: 'one' },
    { value: 'two', content: 'two', disabled: true },
    { value: 'three', content: 'three' },
  ],

  defaultValue: 'Выберете',
};

export const NormalTopRight = Template.bind({});
NormalTopRight.args = {
  direction: 'top right',
  label: 'Выберете',
  items: [
    { value: 'one', content: 'one' },
    { value: 'two', content: 'two', disabled: true },
    { value: 'three', content: 'three' },
  ],
  defaultValue: 'Выберете',
};

export const NormalTopLeft = Template.bind({});
NormalTopLeft.args = {
  direction: 'top left',
  label: 'Выберете',
  items: [
    { value: 'one', content: 'one' },
    { value: 'two', content: 'two', disabled: true },
    { value: 'three', content: 'three' },
  ],

  defaultValue: 'Выберете',
};

// export const NormalReadonly = Template.bind({});
// NormalReadonly.args = {
//   label: 'Выберете',
//   readonly: true,
//   items: [
//     { value: 'one', content: 'one' },
//     { value: 'two', content: 'two', disabled: true },
//     { value: 'three', content: 'three' },
//   ],

//   defaultValue: 'Выберете',
// };

// export const Dark = Template.bind({});
// Dark.args = {
//   items: [
//     { value: 'one', content: 'one' },
//     { value: 'two', content: 'two', disabled: true },
//     { value: 'three', content: 'three' },
//   ],

//   defaultValue: 'Выберете',
// };

// Dark.decorators = [ThemeDecorator(Theme.DARK)];
