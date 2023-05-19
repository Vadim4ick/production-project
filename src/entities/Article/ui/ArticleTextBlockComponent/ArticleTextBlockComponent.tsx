import { FC, memo } from 'react';

import { ArticleTextBlock } from '../../model/types/article';

import cls from './ArticleTextBlockComponent.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';

interface ArticleTextBlockComponentProps {
  className?: string;
  block: ArticleTextBlock;
}

export const ArticleTextBlockComponent: FC<ArticleTextBlockComponentProps> =
  memo((props) => {
    const { className, block } = props;

    return (
      <div
        className={classNames(cls.articleTextBlockComponent, {}, [className])}
      >
        {block.title && (
          <ToggleFeatures
            feature="isAppRedesigned"
            off={<TextDeprecated title={block.title} className={cls.title} />}
            on={<Text title={block.title} className={cls.title} />}
          />
        )}

        {block.paragraphs.map((paragraph, i) => (
          <ToggleFeatures
            key={paragraph}
            feature="isAppRedesigned"
            off={
              <TextDeprecated
                key={paragraph}
                text={paragraph}
                className={cls.paragraph}
              />
            }
            on={
              <Text
                key={paragraph}
                text={paragraph}
                className={cls.paragraph}
              />
            }
          />
        ))}
      </div>
    );
  });
