import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { ArticleView } from '@/entities/Article';
import ListIcon from '@/shared/assets/icons/list.svg';
import TiledIcon from '@/shared/assets/icons/tiled.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button, ThemeButton } from '@/shared/ui/Button/Button';
import { Icon } from '@/shared/ui/Icon/Icon';

import cls from './ArticleViewSelector.module.scss';

interface ArticleViewSelectorProps {
  className?: string;
  view: ArticleView;
  onViewClick?: (view: ArticleView) => void;
}

const viewTypes = [
  {
    view: ArticleView.SMALL,
    icon: TiledIcon,
  },
  {
    view: ArticleView.BIG,
    icon: ListIcon,
  },
];

export const ArticleViewSelector = memo((props: ArticleViewSelectorProps) => {
  const { className, view, onViewClick } = props;
  const { t } = useTranslation();

  // const onClick = (newView: ArticleView) => () => {
  //   onViewClick?.(newView);
  // };

  // или

  const onClick = (newView: ArticleView) => {
    onViewClick?.(newView);
  };

  return (
    <div className={classNames(cls.articleViewSelector, {}, [className])}>
      {viewTypes.map((viewType, i) => (
        <Button
          key={i}
          theme={ThemeButton.CLEAR}
          onClick={() => onClick(viewType.view)}
        >
          <Icon
            Svg={viewType.icon}
            className={classNames('', {
              [cls.notSelected]: viewType.view !== view,
            })}
          />
        </Button>
      ))}
    </div>
  );
});
