import { memo, useState } from 'react';

import StarIcon from '../../../assets/icons/star.svg';
import { Icon } from '../../redesigned/Icon';
import { Icon as IconDeprecated } from '../Icon/Icon';

import cls from './StarRating.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures, toggleFeatures } from '@/shared/lib/features';

interface StarRatingProps {
  className?: string;
  onSelect?: (starsCount: number) => void;
  size?: number;
  selectedStars?: number;
}

const stars = [1, 2, 3, 4, 5];

/**
 * Устарел, используем новые компоненты из папки redesigned
 * @deprecated
 */
export const StarRating = memo((props: StarRatingProps) => {
  const { className, onSelect, selectedStars = 0, size = 30 } = props;

  const [currentStarsCount, setCurrentStarsCount] = useState(selectedStars);
  const [isSelected, setIsSelected] = useState(Boolean(selectedStars));

  const onHover = (startsCount: number) => () => {
    if (!isSelected) {
      setCurrentStarsCount(startsCount);
    }
  };

  const onLeave = () => {
    if (!isSelected) {
      setCurrentStarsCount(0);
    }
  };

  const onClick = (startsCount: number) => () => {
    if (!isSelected) {
      onSelect?.(startsCount);
      setCurrentStarsCount(startsCount);
      setIsSelected(true);
    }
  };

  return (
    <div
      className={classNames(
        toggleFeatures({
          name: 'isAppRedesigned',
          off: () => cls.starRating,
          on: () => cls.starRatingRedesign,
        }),
        {},
        [className],
      )}
    >
      {stars.map((starNumber) => {
        const commonProps = {
          className: classNames(cls.starIcon, { [cls.selected]: isSelected }, [
            currentStarsCount >= starNumber ? cls.hovered : cls.normal,
          ]),
          Svg: StarIcon,
          key: starNumber,
          width: size,
          height: size,
          onMouseLeave: onLeave,
          onMouseEnter: onHover(starNumber),
          onClick: onClick(starNumber),
          'data-testid': `StarRating.${starNumber}`,
          'data-selected': currentStarsCount >= starNumber,
        };

        return (
          <ToggleFeatures
            key={starNumber}
            feature="isAppRedesigned"
            off={<IconDeprecated {...commonProps} />}
            on={<Icon clickable={!isSelected} {...commonProps} />}
          />
        );
      })}
    </div>
  );
});
