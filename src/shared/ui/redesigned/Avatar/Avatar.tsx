import { CSSProperties, useMemo } from 'react';

import UserIcon from '../../../assets/icons/userAvatar.svg';
import { Skeleton } from '../../deprecated/Skeleton';
import { AppImage } from '../../redesigned/AppImage';
import { Icon } from '../Icon';

import cls from './Avatar.module.scss';
import { Mods, classNames } from '@/shared/lib/classNames/classNames';

interface AvatarProps {
  className?: string;
  src?: string;
  size?: number;
  alt?: string;
}

export const Avatar: React.FC<AvatarProps> = (props) => {
  const { className, src, size = 100, alt } = props;

  const mods: Mods = {};

  const styles = useMemo<CSSProperties>(() => {
    return {
      width: size,
      height: size,
    };
  }, [size]);

  const errorFallback = <Icon width={size} height={size} Svg={UserIcon} />;
  const fallback = <Skeleton width={size} height={size} border={'50%'} />;

  return (
    <AppImage
      errorFallback={errorFallback}
      fallback={fallback}
      src={src}
      alt={alt}
      style={styles}
      className={classNames(cls.avatar, mods, [className])}
    />
  );
};
