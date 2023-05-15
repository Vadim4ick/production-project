import { ReactElement, memo } from 'react';

import cls from './StickyLayout.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';

interface StickyLayoutProps {
  className?: string;
  left?: ReactElement;
  content?: ReactElement;
  right?: ReactElement;
}

export const StickyLayout = memo((props: StickyLayoutProps) => {
  const { className, content, left, right } = props;

  return (
    <div className={classNames(cls.stickyLayout, {}, [className])}>
      {right && <div className={cls.left}>{left}</div>}
      <div className={cls.content}>{content}</div>
      {left && <div className={cls.right}>{right}</div>}
    </div>
  );
});
