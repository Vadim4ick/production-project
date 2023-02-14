import { lazy } from 'react';

export const MainPageAsync = lazy(
  async () =>
    await new Promise<any>((resolve) => {
      setTimeout(() => {
        resolve(import('./MainPage'));
      }, 1500);
    }),
);
