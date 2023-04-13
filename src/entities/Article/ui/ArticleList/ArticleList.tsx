import { HTMLAttributeAnchorTarget, memo, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Virtuoso, VirtuosoGrid, VirtuosoGridHandle } from 'react-virtuoso';

import { ArticlesPageFilter } from 'pages/ArticlesPage/ui/ArticlesPageFilter/ArticlesPageFilter';
import { classNames } from 'shared/lib/classNames/classNames';
import { Text, TextSize } from 'shared/ui/Text/Text';

import { Article, ArticleView } from '../../model/types/article';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton';

import cls from './ArticleList.module.scss';

interface ArticleListProps {
  className?: string;
  articles: Article[];
  isLoading?: boolean;
  view?: ArticleView;
  target?: HTMLAttributeAnchorTarget;
  virtualized?: boolean;
  onLoadNextPart?: () => void;
  scrollIdx?: number;
}

const renderSkeleton = (view: ArticleView) =>
  new Array(view === ArticleView.BIG ? 3 : 8)
    .fill(null)
    .map((item, index) => (
      <ArticleListItemSkeleton className={cls.card} key={index} view={view} />
    ));

const Header = () => <ArticlesPageFilter className={cls.list} />;

const ItemContainerComp = ({
  height,
  width,
  index,
}: {
  height: number;
  width: number;
  index: number;
}) => (
  <div className={cls.itemContainer}>
    <ArticleListItemSkeleton
      key={index}
      view={ArticleView.SMALL}
      className={cls.card}
    />
  </div>
);

export const ArticleList = memo((props: ArticleListProps) => {
  const {
    className,
    articles,
    isLoading,
    view = ArticleView.SMALL,
    target,
    virtualized = true,
    onLoadNextPart,
    scrollIdx,
  } = props;

  const { t } = useTranslation('article');

  const virtuosoGridRef = useRef<VirtuosoGridHandle>(null);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (view === ArticleView.SMALL) {
      timeoutId = setTimeout(() => {
        if (virtuosoGridRef.current) {
          virtuosoGridRef.current.scrollToIndex(scrollIdx as number);
        }
      }, 100);
    }

    return () => clearTimeout(timeoutId);
  }, [scrollIdx, view]);

  const Footer = () => {
    if (isLoading && view === ArticleView.SMALL && !articles.length) {
      return (
        <div className={classNames(cls.skeleton, {}, [cls[view]])}>
          {renderSkeleton(view)}
        </div>
      );
    }

    if (isLoading && view === ArticleView.BIG) {
      return <div className={cls.skeleton}>{renderSkeleton(view)}</div>;
    }

    return null;
  };

  if (!isLoading && !articles.length) {
    return (
      <div className={classNames(cls.articleList, {}, [className, cls[view]])}>
        <Text size={TextSize.L} title={t('articles-are-not-found')} />
      </div>
    );
  }

  const renderItem = (index: number, article: Article) => {
    return (
      <div className={cls.itemContainer}>
        <ArticleListItem
          article={article}
          view={view}
          target={target}
          key={`str${index}`}
          index={index}
          className={cls.card}
        />
      </div>
    );
  };

  return (
    <>
      {virtualized ? (
        view === ArticleView.BIG ? (
          <div
            className={classNames(cls.articleList, {}, [className, cls[view]])}
          >
            <Virtuoso
              endReached={onLoadNextPart}
              components={{ Footer, Header }}
              data={articles}
              initialTopMostItemIndex={scrollIdx}
              itemContent={renderItem}
            />
          </div>
        ) : (
          <div
            className={classNames(cls.articleList, {}, [className, cls[view]])}
          >
            <VirtuosoGrid
              ref={virtuosoGridRef}
              totalCount={articles.length}
              components={{
                Header,
                Footer,
                ScrollSeekPlaceholder: ItemContainerComp,
              }}
              endReached={onLoadNextPart}
              data={articles}
              itemContent={renderItem}
              listClassName={cls.itemsWrapper}
              scrollSeekConfiguration={{
                enter: (velocity) => Math.abs(velocity) > 200,
                exit: (velocity) => Math.abs(velocity) < 30,
              }}
            />
          </div>
        )
      ) : (
        articles.map((item) => (
          <ArticleListItem
            article={item}
            view={view}
            target={target}
            key={item.id}
            className={cls.card}
          />
        ))
      )}
    </>
  );
});
