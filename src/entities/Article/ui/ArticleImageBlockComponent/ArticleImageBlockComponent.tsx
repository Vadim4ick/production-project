import { FC, memo } from 'react';

import { ArticleImageBlock } from '../../model/types/article';

import cls from './ArticleImageBlockComponent.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';
import { TextAlign, Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';

interface ArticleImageBlockComponentProps {
  className?: string;
  block: ArticleImageBlock;
}

export const ArticleImageBlockComponent: FC<ArticleImageBlockComponentProps> =
  memo((props) => {
    const { className, block } = props;

    return (
      <div
        className={classNames(cls.articleImageBlockComponent, {}, [className])}
      >
        <img src={block.src} className={cls.img} alt={block.title} />
        {block.title && (
          <ToggleFeatures
            feature="isAppRedesigned"
            off={<TextDeprecated text={block.title} align={TextAlign.CENTER} />}
            on={<Text text={block.title} align={'center'} />}
          />
        )}
      </div>
    );
  });
