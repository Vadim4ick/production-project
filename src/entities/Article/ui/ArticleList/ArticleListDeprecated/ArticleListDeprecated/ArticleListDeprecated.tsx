import { memo, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Virtuoso, VirtuosoGrid, VirtuosoGridHandle } from 'react-virtuoso';

import { ArticleView } from '../../../../model/consts/articleConsts';
import { Article } from '../../../../model/types/article';
import { ArticleListItemDeprecated } from '../../../ArticleListItem/ArticleListItemDeprecated/ArticleListItemDeprecated';
import { ArticleListItemSkeleton } from '../../../ArticleListItem/ArticleListItemSkeleton';
import { ArticleListDeprecatedProps } from '../../ArticleList';

import cls from './ArticleListDeprecated.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text, TextSize } from '@/shared/ui/deprecated/Text';

const renderSkeleton = (view: ArticleView) =>
  new Array(view === ArticleView.BIG ? 3 : 8)
    .fill(null)
    .map((item, index) => (
      <ArticleListItemSkeleton className={cls.card} key={index} view={view} />
    ));

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

export const ArticleListDeprecated = memo(
  (props: ArticleListDeprecatedProps) => {
    const {
      className,
      articles,
      isLoading,
      view = ArticleView.SMALL,
      target,
      virtualized = true,
      onLoadNextPart,
      scrollIdx,
      ArticlesPageFilter,
      setScrollIdx,
    } = props;

    const { t } = useTranslation('article');

    const virtuosoGridRef = useRef<VirtuosoGridHandle>(null);

    const Header = () => ArticlesPageFilter!;

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
        <div
          className={classNames(cls.articleList, {}, [className, cls[view]])}
        >
          <Text size={TextSize.L} title={t('articles-are-not-found')} />
        </div>
      );
    }

    const renderItem = (index: number, article: Article) => {
      return (
        <div className={cls.itemContainer}>
          <ArticleListItemDeprecated
            article={article}
            view={view}
            target={target}
            key={`str${index}`}
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
              data-testid="ArticlesPage"
              className={classNames(cls.articleList, {}, [
                className,
                cls[view],
              ])}
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
              data-testid="ArticlesPage"
              className={classNames(cls.articleList, {}, [
                className,
                cls[view],
              ])}
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
            <ArticleListItemDeprecated
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
  },
);
