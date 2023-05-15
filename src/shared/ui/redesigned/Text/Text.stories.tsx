import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Text } from './Text';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';

export default {
  title: 'shared/redesigned/Text',
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
  variant: 'error',
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
  size: 'l',
};

export const SizeM = Template.bind({});
SizeM.args = {
  title: 'Title lorem ipsun',
  text: 'Description  lorem ipsun',
  size: 'm',
};

export const SizeS = Template.bind({});
SizeS.args = {
  title: 'Title lorem ipsun',
  text: 'Description  lorem ipsun',
  size: 's',
};
