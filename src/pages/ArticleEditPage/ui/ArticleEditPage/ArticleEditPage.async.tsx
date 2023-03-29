import { lazy } from 'react';

export const ArticleEditPageAsync = lazy(
  async () =>
    await new Promise<typeof import('./ArticleEditPage')>((resolve) => {
      setTimeout(() => {
        resolve(import('./ArticleEditPage'));
      }, 1500);
    }),
);
