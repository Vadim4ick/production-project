import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import {
  getArticlesPageError,
  getArticlesPageIsLoading,
  getArticlesPageView,
} from '../../model/selectors/articlesPageSelectors';
import { getArticles } from '../../model/slice/articlesPageSlice';

// import { ArticlesPageFilter } from '../ArticlesPageFilter/ArticlesPageFilter';
// import cls from './ArticleInfiniteList.module.scss';
import { ArticleList } from '@/entities/Article';
// import { scrollRestorationActions } from '@/features/ScrollRestoration';
import { getScrollIndex } from '@/features/ScrollRestoration';
import {
  Text,
  TextAlign,
  TextSize,
  TextTheme,
} from '@/shared/ui/deprecated/Text';

interface ArticleInfiniteListProps {
  className?: string;
  onLoadNextPart?: () => void;
}

export const ArticleInfiniteList = memo((props: ArticleInfiniteListProps) => {
  const { className, onLoadNextPart } = props;

  const { t } = useTranslation('article');

  const articles = useSelector(getArticles.selectAll);
  const isLoading = useSelector(getArticlesPageIsLoading);
  const error = useSelector(getArticlesPageError);
  const view = useSelector(getArticlesPageView);

  const scrollIdx = useSelector(getScrollIndex);

  if (error) {
    return (
      <Text
        align={TextAlign.CENTER}
        size={TextSize.L}
        theme={TextTheme.ERROR}
        title={t('oops-an-error-arose-go-later')}
      />
    );
  }

  return (
    <ArticleList
      className={className}
      isLoading={isLoading}
      // onLoadNextPart={onLoadNextPart}
      // scrollIdx={scrollIdx}
      view={view}
      articles={articles}
      // virtualized={true}
      // ArticlesPageFilter={<ArticlesPageFilter className={cls.marginRight} />}
      // setScrollIdx={scrollRestorationActions.setScrollIndex}
    />
  );
});
