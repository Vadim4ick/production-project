import { ComponentMeta, ComponentStory } from '@storybook/react';

import { AvatarDropdown } from './AvatarDropdown';
import { UserRole } from '@/entities/User';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

export default {
  title: 'features/AvatarDropdown',
  component: AvatarDropdown,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof AvatarDropdown>;

const Template: ComponentStory<typeof AvatarDropdown> = (args) => (
  <AvatarDropdown {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [
  StoreDecorator({
    user: {
      authData: {
        id: '1',
        username: 'Vadim',
        roles: [UserRole.ADMIN],
      },
    },
  }),
];
