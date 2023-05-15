import { ReactNode, memo, useCallback } from 'react';

import { Card } from '../Card/Card';
import { Flex, FlexDirection } from '../Stack/Flex/Flex';

import cls from './Tabs.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';

export interface TabItem {
  value: string;
  content: ReactNode;
}

interface TabsProps {
  className?: string;
  tabs: TabItem[];
  value: string;
  onTabClick: (tab: TabItem) => void;
  direction?: FlexDirection;
}

export const Tabs = memo((props: TabsProps) => {
  const { className, tabs, value, onTabClick, direction = 'row' } = props;

  const clickHandel = useCallback(
    (tab: TabItem) => {
      return () => {
        onTabClick(tab);
      };
    },
    [onTabClick],
  );

  return (
    <Flex
      align="start"
      direction={direction}
      gap="8"
      className={classNames(cls.tabs, {}, [className])}
    >
      {tabs.map((tab) => {
        const isSelected = tab.value === value;

        return (
          <Card
            variant={isSelected ? 'light' : 'normal'}
            key={tab.value}
            className={classNames(cls.tab, { [cls.selected]: isSelected }, [])}
            onClick={clickHandel(tab)}
            border="round"
          >
            {tab.content}
          </Card>
        );
      })}
    </Flex>
  );
});
