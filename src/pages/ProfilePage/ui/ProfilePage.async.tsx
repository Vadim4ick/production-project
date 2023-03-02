import { lazy } from 'react';

export const ProfilePageAsync = lazy(
  async () =>
    await new Promise<any>((resolve) => {
      setTimeout(() => {
        resolve(import('./ProfilePage'));
      }, 1500);
    }),
);
