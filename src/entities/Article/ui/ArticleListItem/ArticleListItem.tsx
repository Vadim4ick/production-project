import { HTMLAttributeAnchorTarget, memo } from 'react';
import { useTranslation } from 'react-i18next';

import {
  ArticleBlockType,
  ArticleView,
} from '../../model/consts/articleConsts';
import { Article, ArticleTextBlock } from '../../model/types/article';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';

import cls from './ArticleListItem.module.scss';
import EyeIcon from '@/shared/assets/icons/eye2.svg';
import { getRouteArticleDetails } from '@/shared/const/router';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { AppImage } from '@/shared/ui/deprecated/AppImage';
import { AppLink } from '@/shared/ui/deprecated/AppLink';
import { Avatar } from '@/shared/ui/deprecated/Avatar';
import { Button, ThemeButton } from '@/shared/ui/deprecated/Button';
import { Card } from '@/shared/ui/deprecated/Card';
import { Icon } from '@/shared/ui/deprecated/Icon';
import { Skeleton } from '@/shared/ui/deprecated/Skeleton';
import { Text } from '@/shared/ui/deprecated/Text';

interface ArticleListItemProps {
  className?: string;
  article: Article;
  view: ArticleView;
  target?: HTMLAttributeAnchorTarget;
  index?: number;
  setScrollIdx?: () => void;
}

export const ArticleListItem = memo((props: ArticleListItemProps) => {
  const { className, article, view, target, index, setScrollIdx } = props;
  const { t } = useTranslation('article');

  const dispatch = useAppDispatch();

  const types = <Text text={article?.type.join(', ')} className={cls.types} />;
  const views = (
    <>
      <Text text={String(article?.views)} className={cls.views} />
      <Icon Svg={EyeIcon} />
    </>
  );

  const handleButtonClick = () => {
    index && dispatch(setScrollIdx);
  };

  if (view === ArticleView.BIG) {
    const textBlock = article.blocks.find(
      (block) => block.type === ArticleBlockType.TEXT,
    ) as ArticleTextBlock;

    return (
      <div
        data-testid="ArticleListItem"
        className={classNames(cls.articleListItem, {}, [className, cls[view]])}
      >
        <Card>
          <div className={cls.header}>
            <Avatar size={30} src={article.user.avatar} />
            <Text text={article.user.username} className={cls.username} />
            <Text text={article.createdAt} className={cls.date} />
          </div>

          <Text text={article.title} className={cls.title} />
          {types}
          <AppImage
            fallback={<Skeleton width={'100%'} height={250} />}
            alt={article.title}
            src={article.img}
            className={cls.img}
          />
          {textBlock && (
            <ArticleTextBlockComponent
              block={textBlock}
              className={cls.textBlock}
            />
          )}

          <div className={cls.footer}>
            <AppLink
              onClick={handleButtonClick}
              target={target}
              to={getRouteArticleDetails(article.id)}
            >
              <Button theme={ThemeButton.OUTLINE}>{t('read more')}</Button>
            </AppLink>
            {views}
          </div>
        </Card>
      </div>
    );
  }

  return (
    <AppLink
      data-testid="ArticleListItem"
      onClick={handleButtonClick}
      target={target}
      to={getRouteArticleDetails(article.id)}
      className={classNames(cls.articleListItem, {}, [className, cls[view]])}
    >
      <Card>
        <div className={cls.imageWrapper}>
          <AppImage
            fallback={<Skeleton width={200} height={200} />}
            alt={article.title}
            src={article.img}
            className={cls.img}
          />

          <Text text={article.createdAt} className={cls.date} />
        </div>

        <div className={cls.infoWrapper}>
          {types}
          {views}
        </div>

        <Text text={article.title} className={cls.title} />
      </Card>
    </AppLink>
  );
});
