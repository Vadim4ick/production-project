import { memo } from 'react';

import cls from './ArticleViewSelector.module.scss';
import { ArticleView } from '@/entities/Article';
import ListIcon from '@/shared/assets/icons/burger.svg';
import ListIconDeprecated from '@/shared/assets/icons/list.svg';
import TiledIcon from '@/shared/assets/icons/tile.svg';
import TiledIconDeprecated from '@/shared/assets/icons/tiled.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures, toggleFeatures } from '@/shared/lib/features';
import {
  Button as ButtonDeprecated,
  ThemeButton,
} from '@/shared/ui/deprecated/Button';
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon';
import { Card } from '@/shared/ui/redesigned/Card';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { HStack } from '@/shared/ui/redesigned/Stack';

interface ArticleViewSelectorProps {
  className?: string;
  view: ArticleView;
  onViewClick?: (view: ArticleView) => void;
}

const viewTypes = [
  {
    view: ArticleView.SMALL,
    icon: toggleFeatures({
      name: 'isAppRedesigned',
      off: () => TiledIconDeprecated,
      on: () => TiledIcon,
    }),
  },
  {
    view: ArticleView.BIG,
    icon: toggleFeatures({
      name: 'isAppRedesigned',
      off: () => ListIconDeprecated,
      on: () => ListIcon,
    }),
  },
];

export const ArticleViewSelector = memo((props: ArticleViewSelectorProps) => {
  const { className, view, onViewClick } = props;

  // const onClick = (newView: ArticleView) => () => {
  //   onViewClick?.(newView);
  // };

  // или

  const onClick = (newView: ArticleView) => {
    onViewClick?.(newView);
  };

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      off={
        <div className={classNames(cls.articleViewSelector, {}, [className])}>
          {viewTypes.map((viewType, i) => (
            <ButtonDeprecated
              key={i}
              theme={ThemeButton.CLEAR}
              onClick={() => onClick(viewType.view)}
            >
              <IconDeprecated
                width={24}
                height={24}
                Svg={viewType.icon}
                className={classNames('', {
                  [cls.notSelected]: viewType.view !== view,
                })}
              />
            </ButtonDeprecated>
          ))}
        </div>
      }
      on={
        <Card
          border="round"
          className={classNames(cls.articleViewSelectorRedesigned, {}, [
            className,
          ])}
        >
          <HStack gap="8">
            {viewTypes.map((viewType, i) => (
              <Icon
                onClick={() => onClick(viewType.view)}
                clickable
                key={i}
                Svg={viewType.icon}
                className={classNames('', {
                  [cls.notSelected]: viewType.view !== view,
                })}
              />
            ))}
          </HStack>
        </Card>
      }
    />
  );
});
