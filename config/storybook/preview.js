/* eslint-disable i18next/no-literal-string */

/* eslint-disable react-hooks/rules-of-hooks */
import { addDecorator } from '@storybook/react';

// import React, { Suspense, useEffect } from 'react';
// import { I18nextProvider } from 'react-i18next';
// import i18n from '../../src/shared/config/i18n/i18nForStorybook';
import { RouterDecorator } from '../../src/shared/config/storybook/RouterDecorator/RouterDecorator';
import { StyleDecorator } from '../../src/shared/config/storybook/StyleDecorator/StyleDecorator';
import { SuspenseDecorator } from '../../src/shared/config/storybook/SuspenseDecorator/SuspenseDecorator';
import { ThemeDecorator } from '../../src/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '../../src/shared/const/theme';

// const withI18next = (Story, context) => {
//   const { locale } = context.globals;

//   useEffect(() => {
//     i18n.changeLanguage(locale);
//   }, [locale]);

//   return (
//     <Suspense fallback={<div>loading translations...</div>}>
//       <I18nextProvider i18n={i18n}>
//         <Story />
//       </I18nextProvider>
//     </Suspense>
//   );
// };

// export const decorators = [withI18next];

// export const globalTypes = {
//   locale: {
//     name: 'Locale',
//     description: 'Internationalization locale',
//     toolbar: {
//       icon: 'globe',
//       items: [
//         { value: 'en', right: '🇺🇸', title: 'English' },
//         { value: 'ru', right: '🇷🇺', title: 'Russian' },
//       ],
//       showName: true,
//       title: 'Язык',
//     },
//   },
// };

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  backgrounds: { disable: true },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  layout: 'fullscreen',
  themes: {
    default: 'light',
    list: [
      { name: 'light', class: Theme.LIGHT, color: '#ffffff' },
      { name: 'dark', class: Theme.DARK, color: '#000000' },
      { name: 'orange', class: Theme.ORANGE, color: '#ffb005' },
    ],
  },
};

addDecorator(StyleDecorator);
addDecorator(ThemeDecorator(Theme.LIGHT));
addDecorator(RouterDecorator);
addDecorator(SuspenseDecorator);
