import { lazy } from 'react';

export const AboutPageAsync = lazy(
  async () =>
    await new Promise<any>((resolve) => {
      setTimeout(() => {
        resolve(import('./AboutPage'));
      }, 1000);
    }),
);
