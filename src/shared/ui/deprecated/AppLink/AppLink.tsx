import React, { ForwardedRef, ReactNode, forwardRef } from 'react';
import { Link, LinkProps } from 'react-router-dom';

import cls from './AppLink.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';

export enum AppLinkTheme {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  RED = 'red',
}

interface AppLinkProps extends LinkProps {
  className?: string;
  theme?: AppLinkTheme;
  children?: ReactNode;
}
/**
 * Устарел, используем новые компоненты из папки redesigned
 * @deprecated
 */
export const AppLink = forwardRef(
  (props: AppLinkProps, ref: ForwardedRef<HTMLAnchorElement>) => {
    const {
      className,
      children,
      to,
      theme = AppLinkTheme.PRIMARY,
      ...otherProps
    } = props;

    return (
      <Link
        to={to}
        {...otherProps}
        className={classNames(cls.appLink, {}, [
          className as string,
          cls[theme],
        ])}
      >
        {children}
      </Link>
    );
  },
);
