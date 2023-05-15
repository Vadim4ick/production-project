import { ButtonHTMLAttributes, ReactNode, memo } from 'react';

import cls from './Button.module.scss';
import { Mods, classNames } from '@/shared/lib/classNames/classNames';

export type VariantButton = 'clear' | 'outline' | 'filled';

export type ButtonSize = 'm' | 'l' | 'xl';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: VariantButton;
  square?: boolean;
  size?: ButtonSize;
  disabled?: boolean;
  children?: ReactNode;
  fullWidth?: boolean;
  addonLeft?: ReactNode;
  addonRight?: ReactNode;
}

export const Button = memo((props: ButtonProps) => {
  const {
    className,
    variant = 'outline',
    square = false,
    size = 'm',
    children,
    disabled = false,
    fullWidth,
    addonLeft,
    addonRight,
    ...otherProps
  } = props;

  const additional = [className, cls[variant], cls[size]];

  const mods: Mods = {
    [cls.square]: square,
    [cls.disabled]: disabled,
    [cls.fullWidth]: fullWidth,
    [cls.widthAddon]: Boolean(addonLeft) || Boolean(addonRight),
  };

  return (
    <button
      className={classNames(cls.button, mods, additional)}
      disabled={disabled}
      {...otherProps}
    >
      <div className={cls.addonLeft}>{addonLeft}</div>

      {children}

      <div className={cls.addonRight}>{addonRight}</div>
    </button>
  );
});
