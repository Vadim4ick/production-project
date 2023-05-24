import { HTMLAttributeAnchorTarget, memo } from 'react';

import { ArticleView } from '../../model/consts/articleConsts';
import { Article } from '../../model/types/article';

import { ArticleListDeprecated } from './ArticleListDeprecated/ArticleListDeprecated/ArticleListDeprecated';
import { ArticleListRedesign } from './ArticleListRedesign/ArticleListRedesign/ArticleListRedesign';
import { ToggleFeatures } from '@/shared/lib/features';

export interface ArticleListProps {
  className?: string;
  articles: Article[];
  isLoading?: boolean;
  target?: HTMLAttributeAnchorTarget;
  view?: ArticleView;
  virtualized?: boolean;
}

export interface ArticleListDeprecatedProps extends ArticleListProps {
  onLoadNextPart?: () => void;
  scrollIdx?: number;
  ArticlesPageFilter?: JSX.Element;
  setScrollIdx?: (action: number) => void;
}

export const ArticleList = memo(
  (props: ArticleListProps | ArticleListDeprecatedProps) => {
    return (
      <ToggleFeatures
        feature="isAppRedesigned"
        on={<ArticleListRedesign {...props} />}
        off={<ArticleListDeprecated {...props} />}
      />
    );
  },
);
