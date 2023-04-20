import { memo } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './Text.module.scss';

export enum TextTheme {
  PRIMARY = 'primary',
  INVERTED = 'inverted',
  ERROR = 'error',
}

export enum TextAlign {
  RIGHT = 'right',
  LEFT = 'left',
  CENTER = 'center',
}

export enum TextSize {
  S = 'size_s',
  M = 'size_m',
  L = 'size_l',
}

interface TextProps {
  className?: string;
  title?: string;
  text?: string;
  theme?: TextTheme;
  align?: TextAlign;
  size?: TextSize;

  'data-testid'?: string;
}

type HeaderTagType = 'h1' | 'h2' | 'h3';

const mapSizeToHeaderTag: Record<TextSize, HeaderTagType> = {
  [TextSize.S]: 'h3',
  [TextSize.M]: 'h2',
  [TextSize.L]: 'h1',
};

export const Text: React.FC<TextProps> = memo((props) => {
  const {
    className,
    text,
    title,
    theme = TextTheme.PRIMARY,
    align = TextAlign.LEFT,
    size = TextSize.M,
    'data-testid': dataTestId = 'Text',
  } = props;

  const HeaderTag = mapSizeToHeaderTag[size];

  return (
    <div
      className={classNames(cls.text, {}, [
        className as string,
        cls[theme],
        cls[align],
        cls[size],
      ])}
    >
      {title && (
        <HeaderTag data-testid={`${dataTestId}.Header`} className={cls.title}>
          {title}
        </HeaderTag>
      )}
      {text && (
        <p data-testid={`${dataTestId}.Paragraph`} className={cls.text}>
          {text}
        </p>
      )}
    </div>
  );
});
