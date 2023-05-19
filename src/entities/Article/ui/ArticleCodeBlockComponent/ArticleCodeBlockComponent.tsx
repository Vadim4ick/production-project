import { FC, memo } from 'react';

import { ArticleCodeBlock } from '../../model/types/article';

import cls from './ArticleCodeBlockComponent.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { toggleFeatures } from '@/shared/lib/features';
import { Code } from '@/shared/ui/redesigned/Code';

interface ArticleCodeBlockComponentProps {
  className?: string;
  block: ArticleCodeBlock;
}

export const ArticleCodeBlockComponent: FC<ArticleCodeBlockComponentProps> =
  memo((props) => {
    const { className, block } = props;

    return (
      <div className={classNames('', {}, [className])}>
        <Code
          text={block.code}
          className={toggleFeatures({
            name: 'isAppRedesigned',
            off: () => '',
            on: () => cls.widthCode,
          })}
        />
      </div>
    );
  });
