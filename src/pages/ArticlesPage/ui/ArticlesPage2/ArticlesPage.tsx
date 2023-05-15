import { FC, memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import { getArticlesPageError } from '../../model/selectors/articlesPageSelectors';
import { fetchNextArticlesPage } from '../../model/services/fetchNextArticlesPage/fetchNextArticlesPage';
import { initArticlesPage } from '../../model/services/initArticlesPage/initArticlesPage';
import { articlesPageReducer } from '../../model/slice/articlesPageSlice';
import { ArticleInfiniteList } from '../ArticleInfiniteList/ArticleInfiniteList';

import { ArticlePageGreeting } from '@/features/articlePageGreeting';
import {
  DynamicModuleLoader,
  ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';

interface ArticlesPageProps {
  className?: string;
}
const reducers: ReducersList = {
  articlesPage: articlesPageReducer,
};
const ArticlesPage: FC<ArticlesPageProps> = (props) => {
  const { className } = props;

  const error = useSelector(getArticlesPageError);

  const dispatch = useAppDispatch();

  const [searchParams] = useSearchParams();

  const onLoadNextPart = useCallback(() => {
    if (__PROJECT__ !== 'storybook') {
      if (!error) {
        dispatch(fetchNextArticlesPage());
      }
    }
  }, [dispatch, error]);

  useInitialEffect(() => {
    dispatch(initArticlesPage(searchParams));
  });

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
      <ArticleInfiniteList onLoadNextPart={onLoadNextPart} />
      <ArticlePageGreeting />
    </DynamicModuleLoader>
  );
};
export default memo(ArticlesPage);
