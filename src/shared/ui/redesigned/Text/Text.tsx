import { memo } from 'react';

import cls from './Text.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';

export type TextVariant = 'primary' | 'error' | 'accent';

export type TextAlign = 'right' | 'left' | 'center';

export type TextSize = 's' | 'm' | 'l';

interface TextProps {
  className?: string;
  title?: string;
  text?: string;
  variant?: TextVariant;
  align?: TextAlign;
  size?: TextSize;

  'data-testid'?: string;
}

type HeaderTagType = 'h1' | 'h2' | 'h3';

const mapSizeToClass: Record<TextSize, string> = {
  s: 'size_s',
  m: 'size_m',
  l: 'size_l',
};
const mapSizeToHeaderTag: Record<TextSize, HeaderTagType> = {
  s: 'h3',
  m: 'h2',
  l: 'h1',
};

export const Text: React.FC<TextProps> = memo((props) => {
  const {
    className,
    text,
    title,
    variant = 'primary',
    align = 'left',
    size = 'm',
    'data-testid': dataTestId = 'Text',
  } = props;

  const HeaderTag = mapSizeToHeaderTag[size];
  const sizeClass = mapSizeToClass[size];

  return (
    <div
      className={classNames(cls.text, {}, [
        className as string,
        cls[variant],
        cls[align],
        cls[size],
        sizeClass,
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
