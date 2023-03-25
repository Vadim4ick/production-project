import { FC, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { ArticleList, ArticleView } from 'entities/Article';
import { ArticleViewSelector } from 'features/ArticleViewSelector/ArticleViewSelector';
import { fetchNextArticlesPage } from 'pages/ArticlesPage/model/services/fetchNextArticlesPage/fetchNextArticlesPage';
import { classNames } from 'shared/lib/classNames/classNames';
import {
  DynamicModuleLoader,
  ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { Page } from 'shared/ui/Page/Page';
import { Text, TextAlign, TextSize, TextTheme } from 'shared/ui/Text/Text';

import {
  getArticlesPageError,
  getArticlesPageIsLoading,
  getArticlesPageView,
} from '../../model/selectors/articlesPageSelectors';
import { fetchArticlesList } from '../../model/services/fetchArticlesList/fetchArticlesList';
import {
  articlesPageActions,
  articlesPageReducer,
  getArticles,
} from '../../model/slice/articlesPageSlice';

import cls from './ArticlesPage.module.scss';

interface ArticlesPageProps {
  className?: string;
}
const reducers: ReducersList = {
  articlesPage: articlesPageReducer,
};
const ArticlesPage: FC<ArticlesPageProps> = (props) => {
  const { className } = props;

  const { t } = useTranslation('article');

  const articles = useSelector(getArticles.selectAll);
  const isLoading = useSelector(getArticlesPageIsLoading);
  const error = useSelector(getArticlesPageError);
  const view = useSelector(getArticlesPageView);
  const dispatch = useAppDispatch();

  useInitialEffect(() => {
    if (!error) {
      dispatch(articlesPageActions.initState());
      dispatch(
        fetchArticlesList({
          page: 1,
        }),
      );
    }
  });

  const onChangeView = useCallback(
    (view: ArticleView) => {
      if (!error) {
        dispatch(articlesPageActions.setView(view));
      }
    },
    [dispatch, error],
  );

  const onLoadNextPart = useCallback(() => {
    if (!error) {
      dispatch(fetchNextArticlesPage());
    }
  }, [dispatch, error]);

  if (error) {
    return (
      <Page
        onScrollEnd={onLoadNextPart}
        className={classNames(cls.articlesPage, {}, [className])}
      >
        <Text
          align={TextAlign.CENTER}
          size={TextSize.L}
          theme={TextTheme.ERROR}
          title={t('oops-an-error-arose-go-later')}
        />
      </Page>
    );
  }

  return (
    <DynamicModuleLoader reducers={reducers}>
      <Page
        isLoading={isLoading}
        onScrollEnd={onLoadNextPart}
        className={classNames(cls.articlesPage, {}, [className])}
      >
        <ArticleViewSelector view={view} onViewClick={onChangeView} />
        <ArticleList isLoading={isLoading} view={view} articles={articles} />
      </Page>
    </DynamicModuleLoader>
  );
};
export default memo(ArticlesPage);
