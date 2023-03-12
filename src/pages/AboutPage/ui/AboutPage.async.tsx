import { lazy } from 'react';

export const AboutPageAsync = lazy(
  async () =>
    await new Promise<typeof import('./AboutPage')>((resolve) => {
      setTimeout(() => {
        resolve(import('./AboutPage'));
      }, 1000);
    }),
);
