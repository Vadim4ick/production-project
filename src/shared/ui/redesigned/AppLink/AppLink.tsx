import { ForwardedRef, ReactNode, forwardRef } from 'react';
import { LinkProps } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

import cls from './AppLink.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';

export type AppLinkVariant = 'primary' | 'red';

interface AppLinkProps extends LinkProps {
  className?: string;
  variant?: AppLinkVariant;
  children?: ReactNode;
  activeClassName?: string;
}

export const AppLink = forwardRef(
  (props: AppLinkProps, ref: ForwardedRef<HTMLAnchorElement>) => {
    const {
      className,
      children,
      to,
      variant = 'primary',
      activeClassName = '',
      ...otherProps
    } = props;

    return (
      <NavLink
        to={to}
        {...otherProps}
        className={({ isActive }) =>
          classNames(cls.appLink, { [activeClassName]: isActive }, [
            className as string,
            cls[variant],
          ])
        }
      >
        {children}
      </NavLink>
    );
  },
);
