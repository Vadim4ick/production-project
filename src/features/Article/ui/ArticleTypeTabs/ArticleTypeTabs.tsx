import { memo, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { ArticleType } from '@/entities/Article';
// import { ArticleType } from 'entities/Article';
import { classNames } from '@/shared/lib/classNames/classNames';
import { TabItem, Tabs } from '@/shared/ui/Tabs';

interface ArticleTypeTabsProps {
  className?: string;
  value: ArticleType;
  onChangeType: (type: ArticleType) => void;
}

export const ArticleTypeTabs = memo((props: ArticleTypeTabsProps) => {
  const { className, value, onChangeType } = props;
  const { t } = useTranslation('article');

  const onTabClick = useCallback(
    (tab: TabItem) => {
      onChangeType(tab.value as ArticleType);
    },
    [onChangeType],
  );

  const typeTabs = useMemo<TabItem[]>(() => {
    return [
      { content: t('All articles'), value: ArticleType.ALL },
      { content: t('it'), value: ArticleType.IT },
      { content: t('economy'), value: ArticleType.ECONOMIC },
      { content: t('science'), value: ArticleType.SCIENCE },
    ];
  }, [t]);

  return (
    <Tabs
      tabs={typeTabs}
      value={value}
      onTabClick={onTabClick}
      className={classNames('', {}, [className])}
    />
  );
});
