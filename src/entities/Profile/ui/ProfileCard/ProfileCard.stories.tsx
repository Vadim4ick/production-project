import { ComponentMeta, ComponentStory } from '@storybook/react';

import { ProfileCard } from './ProfileCard';
import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

export default {
  title: 'entities/ProfileCard',
  component: ProfileCard,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ProfileCard>;

const Template: ComponentStory<typeof ProfileCard> = (args) => (
  <ProfileCard {...args} />
);

const primaryArgs = {
  data: {
    first: 'Вадим',
    lastname: 'Фирулев',
    age: '19',
    currency: Currency.USD,
    country: Country.Russia,
    city: 'Пермь',
    username: 'admin',
    // avatar:
    //   'https://pic.rutubelist.ru/user/3b/27/3b2758ad5492a76b578f7ee072e4e894.jpg',
  },
};

export const Primary = Template.bind({});
Primary.args = primaryArgs;

export const PrimaryRedesign = Template.bind({});
PrimaryRedesign.args = primaryArgs;
PrimaryRedesign.decorators = [NewDesignDecorator];

export const withError = Template.bind({});
withError.args = {
  error: 'true',
};

export const isLoading = Template.bind({});
isLoading.args = {
  isLoading: true,
};
