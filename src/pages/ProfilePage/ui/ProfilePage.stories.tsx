import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Theme } from '@/app/providers/ThemeProvider';
import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import ProfilePage from './ProfilePage';

export default {
  title: 'pages/ProfilePage',
  component: ProfilePage,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ProfilePage>;

const Template: ComponentStory<typeof ProfilePage> = () => <ProfilePage />;

export const Light = Template.bind({});
Light.args = {};
Light.decorators = [
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

export const Dark = Template.bind({});

Dark.args = {};
Dark.decorators = [
  ThemeDecorator(Theme.DARK),
  StoreDecorator({
    // profile: {
    //   form: {
    //     first: 'Вадим',
    //     lastname: 'Фирулев',
    //     age: '19',
    //     currency: Currency.USD,
    //     country: Country.Russia,
    //     city: 'Пермь',
    //     username: 'admin',
    //   },
    // },
  }),
];
