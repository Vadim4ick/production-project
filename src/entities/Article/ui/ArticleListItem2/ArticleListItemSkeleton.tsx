import { memo } from 'react';

import { ArticleView } from '../../model/consts/articleConsts';

import cls from './ArticleListItem.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Card } from '@/shared/ui/deprecated/Card';
import { Skeleton } from '@/shared/ui/deprecated/Skeleton';

interface ArticleListItemSkeletonProps {
  className?: string;
  view: ArticleView;
}

export const ArticleListItemSkeleton = memo(
  (props: ArticleListItemSkeletonProps) => {
    const { className, view } = props;

    if (view === ArticleView.BIG) {
      return (
        <div
          className={classNames(cls.articleListItem, {}, [
            className,
            cls[view],
          ])}
        >
          <Card>
            <div className={cls.header}>
              <Skeleton border="50%" height={30} width={30} />
              <Skeleton height={16} width={150} className={cls.username} />
              <Skeleton height={16} width={150} className={cls.date} />
            </div>

            <Skeleton height={24} width={250} className={cls.title} />
            <Skeleton height={250} className={cls.img} />

            <div className={cls.footer}>
              <Skeleton height={36} width={200} />
            </div>
          </Card>
        </div>
      );
    }

    return (
      <div
        className={classNames(cls.articleListItem, {}, [className, cls[view]])}
      >
        <Card>
          <div className={cls.imageWrapper}>
            <Skeleton width={200} height={200} className={cls.img} />
          </div>

          <div className={cls.infoWrapper}>
            <Skeleton width={130} height={16} />
          </div>

          <Skeleton width={150} height={16} className={cls.title} />
        </Card>
      </div>
    );
  },
);