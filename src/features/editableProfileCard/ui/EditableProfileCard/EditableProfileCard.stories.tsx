import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

import { EditableProfileCard } from './EditableProfileCard';

export default {
  title: 'features/editableProfileCard/EditableProfileCard',
  component: EditableProfileCard,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof EditableProfileCard>;

const Template: ComponentStory<typeof EditableProfileCard> = (args) => (
  <EditableProfileCard {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [
  StoreDecorator({
    profile: {
      form: {
        first: 'Вадим',
        lastname: 'Фирулев',
        age: '19',
        currency: Currency.USD,
        country: Country.Russia,
        city: 'Пермь',
        username: 'admin',
      },
    },
  }),
];
