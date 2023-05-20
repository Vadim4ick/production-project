import { memo } from 'react';

import CircleTop from '@/shared/assets/icons/circle-up.svg';
import { Icon } from '@/shared/ui/redesigned/Icon';

interface scrollToTopButtonProps {
  className?: string;
}

export const ScrollToTopButton = memo((props: scrollToTopButtonProps) => {
  const { className } = props;

  const onClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Icon
      Svg={CircleTop}
      onClick={onClick}
      width={32}
      height={32}
      clickable
      className={className}
    />
  );
});
