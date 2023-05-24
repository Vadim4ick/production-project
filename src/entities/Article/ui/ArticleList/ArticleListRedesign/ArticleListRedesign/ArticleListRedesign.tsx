import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { ArticleView } from '../../../../model/consts/articleConsts';
import { ArticleListItem } from '../../../ArticleListItem/ArticleListItem';
import { ArticleListItemSkeleton } from '../../../ArticleListItem/ArticleListItemSkeleton';
import { ArticleListProps } from '../../ArticleList';

import cls from './ArticleList.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text } from '@/shared/ui/redesigned/Text';

const getSkeletons = (view: ArticleView) =>
  new Array(view === ArticleView.SMALL ? 9 : 3)
    .fill(0)
    .map((item, index) => (
      <ArticleListItemSkeleton className={cls.card} key={index} view={view} />
    ));

export const ArticleListRedesign = memo((props: ArticleListProps) => {
  const {
    className,
    articles,
    view = ArticleView.SMALL,
    isLoading,
    target,
    virtualized = true,
  } = props;
  const { t } = useTranslation();

  if (!isLoading && !articles.length) {
    return (
      <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
        <Text size={'l'} title={t('Статьи не найдены')} />
      </div>
    );
  }

  return (
    <div
      className={classNames(
        virtualized
          ? cls.ArticleListRedesigned
          : cls.ArticleListRedesignedNoVirtualezated,
        {},
        [cls[view]],
      )}
      data-testid="ArticleList"
    >
      {articles.map((item) => (
        <ArticleListItem
          article={item}
          view={view}
          target={target}
          key={item.id}
          className={cls.card}
        />
      ))}
      {isLoading && getSkeletons(view)}
    </div>
  );
});
