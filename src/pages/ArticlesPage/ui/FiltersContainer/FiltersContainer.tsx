import { memo } from 'react';

import { useArticleFilters } from '../../lib/hooks/useArticleFilters';

import { ArticlesFilters } from '@/widgets/ArticlesFilters';

interface FiltersContainerProps {
  className?: string;
}

export const FiltersContainer = memo((props: FiltersContainerProps) => {
  const { className } = props;

  const {
    onChangeOrder,
    onChangeSearch,
    onChangeSort,
    onChangeType,
    onChangeView,
    order,
    search,
    sort,
    type,
  } = useArticleFilters();

  return (
    <ArticlesFilters
      type={type}
      onChangeOrder={onChangeOrder}
      onChangeSearch={onChangeSearch}
      onChangeSort={onChangeSort}
      onChangeType={onChangeType}
      order={order}
      search={search}
      sort={sort}
      className={className}
    />
  );
});
