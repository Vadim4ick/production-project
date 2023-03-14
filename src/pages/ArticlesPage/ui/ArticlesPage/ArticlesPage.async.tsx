import { lazy } from 'react';

export const ArticlesPageAsync = lazy(
  async () =>
    await new Promise<typeof import('./ArticlesPage')>((resolve) => {
      setTimeout(() => {
        resolve(import('./ArticlesPage'));
      }, 1500);
    }),
);
