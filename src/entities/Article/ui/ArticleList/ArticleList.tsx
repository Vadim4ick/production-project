/* eslint-disable react/jsx-key */
import { log } from 'console';
import {
  HTMLAttributeAnchorTarget,
  memo,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { List, ListRowProps, WindowScroller } from 'react-virtualized';
import { Virtuoso, VirtuosoGrid, VirtuosoGridHandle } from 'react-virtuoso';

import { ArticlesPageFilter } from 'pages/ArticlesPage/ui/ArticlesPageFilter/ArticlesPageFilter';
import { ARTICLE_LIST_ITEM_LOCALSTORAGE_IDX } from 'shared/const/localstorage';
import { classNames } from 'shared/lib/classNames/classNames';
import { HStack } from 'shared/ui/Stack';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { PAGE_ID, Page } from 'widgets/Page/Page';

import { Article, ArticleView } from '../../model/types/article';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton';

import cls from './ArticleList.module.scss';

window.addEventListener('error', (e) => {
  if (
    e.message ===
      'ResizeObserver loop completed with undelivered notifications.' ||
    e.message === 'ResizeObserver loop limit exceeded'
  ) {
    console.log(e);

    e.stopImmediatePropagation();
    return;
  }
});

interface ArticleListProps {
  className?: string;
  articles: Article[];
  isLoading?: boolean;
  view?: ArticleView;
  target?: HTMLAttributeAnchorTarget;
  virtualized?: boolean;
  onLoadNextPart?: () => void;
}

const renderSkeleton = () =>
  new Array(3)
    .fill(null)
    .map((item, index) => (
      <ArticleListItemSkeleton
        className={cls.card}
        key={index}
        view={ArticleView.BIG}
      />
    ));

const Header = () => <ArticlesPageFilter className={cls.list} />;

export const ArticleList = memo((props: ArticleListProps) => {
  const {
    className,
    articles,
    isLoading,
    view = ArticleView.SMALL,
    target,
    virtualized = true,
    onLoadNextPart,
  } = props;

  const { t } = useTranslation('article');

  const [selectedArticleId, setSelectedArticleId] = useState(0);
  const virtuosoGridRef = useRef<VirtuosoGridHandle>(null);

  useEffect(() => {
    const pages =
      sessionStorage.getItem(ARTICLE_LIST_ITEM_LOCALSTORAGE_IDX) || 0;

    setSelectedArticleId(Number(pages));
  }, []);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (view === ArticleView.SMALL) {
      timeoutId = setTimeout(() => {
        if (virtuosoGridRef.current) {
          virtuosoGridRef.current.scrollToIndex(selectedArticleId);
        }
      }, 100);
    }

    return () => clearTimeout(timeoutId);
  });

  const Footer = () => {
    if (isLoading) {
      return <div className={cls.skeleton}>{renderSkeleton()}</div>;
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
      <ArticleListItemSkeleton key={index} view={view} className={cls.card} />
    </div>
  );

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
    <div className={classNames(cls.articleList, {}, [className, cls[view]])}>
      {view === ArticleView.BIG ? (
        <Virtuoso
          endReached={onLoadNextPart}
          components={{ Footer, Header }}
          data={articles}
          initialTopMostItemIndex={selectedArticleId}
          itemContent={renderItem}
        />
      ) : (
        <VirtuosoGrid
          ref={virtuosoGridRef}
          totalCount={articles.length}
          components={{
            Header,
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
      )}
    </div>
  );
});
