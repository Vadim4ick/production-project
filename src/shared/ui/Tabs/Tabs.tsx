import { ReactNode, memo, useCallback } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';

import { Card, CardTheme } from '../Card/Card';

import cls from './Tabs.module.scss';

export interface TabItem {
  value: string;
  content: ReactNode;
}

interface TabsProps {
  className?: string;
  tabs: TabItem[];
  value: string;
  onTabClick: (tab: TabItem) => void;
}

export const Tabs = memo((props: TabsProps) => {
  const { className, tabs, value, onTabClick } = props;

  const clickHandel = useCallback(
    (tab: TabItem) => {
      return () => {
        onTabClick(tab);
      };
    },
    [onTabClick],
  );

  return (
    <div className={classNames(cls.tabs, {}, [className])}>
      {tabs.map((tab) => (
        <Card
          theme={tab.value === value ? CardTheme.NORMAL : CardTheme.OUTLINED}
          key={tab.value}
          className={cls.tab}
          onClick={clickHandel(tab)}
        >
          {tab.content}
        </Card>
      ))}
    </div>
  );
});
