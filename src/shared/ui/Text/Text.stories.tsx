import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Theme } from '@/app/providers/ThemeProvider';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Text, TextSize, TextTheme } from './Text';

export default {
  title: 'shared/Text',
  component: Text,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Text>;

const Template: ComponentStory<typeof Text> = (args) => <Text {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  title: 'Title lorem ipsun',
  text: 'Description  lorem ipsun',
};

export const Error = Template.bind({});
Error.args = {
  title: 'Title lorem ipsun',
  text: 'Description  lorem ipsun',
  theme: TextTheme.ERROR,
};

export const onlyTitle = Template.bind({});
onlyTitle.args = {
  title: 'Title lorem ipsun',
};

export const onlyText = Template.bind({});
onlyText.args = {
  text: 'Description  lorem ipsun',
};

export const PrimaryDark = Template.bind({});
PrimaryDark.args = {
  title: 'Title lorem ipsun',
  text: 'Description  lorem ipsun',
};

PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];

export const onlyTitleDark = Template.bind({});
onlyTitleDark.args = {
  title: 'Title lorem ipsun',
};

onlyTitleDark.decorators = [ThemeDecorator(Theme.DARK)];

export const onlyTextDark = Template.bind({});
onlyTextDark.args = {
  text: 'Description  lorem ipsun',
};

onlyTextDark.decorators = [ThemeDecorator(Theme.DARK)];

export const SizeL = Template.bind({});
SizeL.args = {
  title: 'Title lorem ipsun',
  text: 'Description  lorem ipsun',
  size: TextSize.L,
};

export const SizeM = Template.bind({});
SizeM.args = {
  title: 'Title lorem ipsun',
  text: 'Description  lorem ipsun',
  size: TextSize.M,
};

export const SizeS = Template.bind({});
SizeS.args = {
  title: 'Title lorem ipsun',
  text: 'Description  lorem ipsun',
  size: TextSize.S,
};
