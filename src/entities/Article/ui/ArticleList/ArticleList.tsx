import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from 'shared/lib/classNames/classNames';

import { Article, ArticleView } from '../../model/types/article';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton';

import cls from './ArticleList.module.scss';

interface ArticleListProps {
  className?: string;
  articles: Article[];
  isLoading?: boolean;
  view?: ArticleView;
}

export const ArticleList = memo((props: ArticleListProps) => {
  const { className, articles, isLoading, view = ArticleView.SMALL } = props;
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <div className={classNames(cls.articleList, {}, [className, cls[view]])}>
        {new Array(view === ArticleView.SMALL ? 8 : 3)
          .fill(0)
          .map((_, index) => (
            <ArticleListItemSkeleton view={view} key={index} />
          ))}
      </div>
    );
  }

  const renderArticle = (article: Article) => {
    return <ArticleListItem article={article} view={view} key={article.id} />;
  };

  return (
    <div className={classNames(cls.articleList, {}, [className, cls[view]])}>
      {articles?.length > 0 ? articles?.map(renderArticle) : null}
    </div>
  );
});
