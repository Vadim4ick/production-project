import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import cls from './ArticleSortSelector.module.scss';
import { ArticleSortField } from '@/entities/Article';
import { classNames } from '@/shared/lib/classNames/classNames';
import { SortOrder } from '@/shared/types/sort';
import { Select, SelectOptions } from '@/shared/ui/Select';

interface ArticleSortSelectorProps {
  className?: string;
  sort: ArticleSortField;
  order: SortOrder;
  onChangeOrder: (newOrder: SortOrder) => void;
  onChangeSort: (newSort: ArticleSortField) => void;
}

export const ArticleSortSelector = (props: ArticleSortSelectorProps) => {
  const { className, sort, order, onChangeOrder, onChangeSort } = props;

  const { t } = useTranslation('article');

  const orderOptions = useMemo<SelectOptions<SortOrder>[]>(
    () => [
      {
        value: 'asc',
        content: t('increasing'),
      },
      {
        value: 'desc',
        content: t('descending'),
      },
    ],
    [t],
  );

  const sortFieldOptions = useMemo<SelectOptions<ArticleSortField>[]>(
    () => [
      {
        value: ArticleSortField.CREATED,
        content: t('The date of creation'),
      },
      {
        value: ArticleSortField.TITLE,
        content: t('name'),
      },
      {
        value: ArticleSortField.VIEWS,
        content: t('views'),
      },
    ],
    [t],
  );

  return (
    <div className={classNames(cls.articleSortSelector, {}, [className])}>
      <Select
        value={sort}
        onChange={onChangeSort}
        options={sortFieldOptions}
        label={t('Sort by')}
      />

      <Select
        onChange={onChangeOrder}
        value={order}
        options={orderOptions}
        label={t('on')}
        className={cls.order}
      />
    </div>
  );
};
