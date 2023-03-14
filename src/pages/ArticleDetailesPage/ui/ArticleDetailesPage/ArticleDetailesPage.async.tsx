import { lazy } from 'react';

export const ArticleDetailesPageAsync = lazy(
  async () =>
    await new Promise<typeof import('./ArticleDetailesPage')>((resolve) => {
      setTimeout(() => {
        resolve(import('./ArticleDetailesPage'));
      }, 1500);
    }),
);
