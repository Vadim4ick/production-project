/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ButtonHTMLAttributes, FC } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Button.module.scss';

export enum ThemeButton {
  CLEAR = 'clear',
  OUTLINE = 'outline',
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
}

export const Button: FC<ButtonProps> = (props) => {
  const {
    className,
    theme,
    square = false,
    size = ButtonSize.M,
    children,
    ...otherProps
  } = props;

  const additional = [
    className as string,
    cls[theme as ThemeButton],
    cls[size],
  ];

  return (
    <button
      className={classNames(cls.button, { [cls.square]: square }, additional)}
      {...otherProps}
    >
      {children}
    </button>
  );
};
