import { ButtonHTMLAttributes, FC, ReactNode, memo } from 'react';

import cls from './Button.module.scss';
import { Mods, classNames } from '@/shared/lib/classNames/classNames';

export enum ThemeButton {
  CLEAR = 'clear',
  OUTLINE = 'outline',
  OUTLINE_RED = 'outline_red',
  BACKGROUND = 'background',
  BACKGROUND_INVERTED = 'backgroundInverted',
  CLEAR_INVERTED = 'clearInverted',
}

export enum ButtonSize {
  M = 'size_m',
  L = 'size_l',
  XL = 'size_xl',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  theme?: ThemeButton;
  square?: boolean;
  size?: ButtonSize;
  disabled?: boolean;
  children?: ReactNode;
  fullWidth?: boolean;
}

export const Button = memo((props: ButtonProps) => {
  const {
    className,
    theme = ThemeButton.OUTLINE,
    square = false,
    size = ButtonSize.M,
    children,
    disabled = false,
    fullWidth,
    ...otherProps
  } = props;

  const additional = [className, cls[theme], cls[size]];

  const mods: Mods = {
    [cls.square]: square,
    [cls.disabled]: disabled,
    [cls.fullWidth]: fullWidth,
  };

  return (
    <button
      className={classNames(cls.button, mods, additional)}
      disabled={disabled}
      {...otherProps}
    >
      {children}
    </button>
  );
});
