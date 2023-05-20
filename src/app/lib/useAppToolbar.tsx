import { ReactElement } from 'react';

import { AppRoutes } from '@/shared/const/router';
import { useRouteChange } from '@/shared/router/useRouteChange';
import { ScrollToolbar } from '@/widgets/ScrollToolbar';

export function useAppToolbar() {
  const appRoute = useRouteChange();

  const toolbarByAppRoute: OptionalRecord<AppRoutes, ReactElement> = {
    [AppRoutes.ARTICLES]: <ScrollToolbar />,
    [AppRoutes.ARTICLE_DETAILES]: <ScrollToolbar />,
  };

  return toolbarByAppRoute[appRoute];
}
