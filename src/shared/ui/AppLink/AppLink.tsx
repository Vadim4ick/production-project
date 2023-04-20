import React, { ForwardedRef, ReactNode, forwardRef, memo } from 'react';
import { Link, LinkProps } from 'react-router-dom';

import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './AppLink.module.scss';

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
