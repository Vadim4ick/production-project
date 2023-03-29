import { lazy } from 'react';

export const ArticleDetailesPageAsync = lazy(
  () => import('./ArticleDetailesPage'),
);
