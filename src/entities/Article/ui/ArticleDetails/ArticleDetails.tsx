import { FC, memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import {
  getArticleDetailsData,
  getArticleDetailsError,
  getArticleDetailsIsLoading,
} from '../../model/selectors/ArticleDetails';
import { fetchArticleById } from '../../model/services/fetchArticleById/fetchArticleById';
import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice';

import cls from './ArticleDetails.module.scss';
import { renderBlock } from './renderBlock';
import CalendarIcon from '@/shared/assets/icons/calendar.svg';
import EyeIcon from '@/shared/assets/icons/eye.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
  DynamicModuleLoader,
  ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { ToggleFeatures, toggleFeatures } from '@/shared/lib/features';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Avatar } from '@/shared/ui/deprecated/Avatar';
import { Icon } from '@/shared/ui/deprecated/Icon';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import {
  TextAlign,
  Text as TextDeprecated,
  TextSize,
} from '@/shared/ui/deprecated/Text';
import { AppImage } from '@/shared/ui/redesigned/AppImage';
import { Skeleton as SkeletonRedesign } from '@/shared/ui/redesigned/Skeleton';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

interface ArticleDetailsProps {
  className?: string;
  id?: string;
}

const reducers: ReducersList = {
  articleDetails: articleDetailsReducer,
};

const Deprecated = () => {
  const article = useSelector(getArticleDetailsData);

  return (
    <>
      <HStack justify="center" max className={cls.avatarWrapper}>
        <Avatar size={200} src={article?.img} className={cls.avatar} />
      </HStack>

      <VStack gap="4" max data-testid="ArticleDetails.Info">
        <TextDeprecated
          className={cls.title}
          title={article?.title}
          text={article?.subtitle}
          size={TextSize.L}
        />

        <HStack gap="8" className={cls.articleInfo}>
          <Icon Svg={EyeIcon} />
          <TextDeprecated text={String(article?.views)} />
        </HStack>

        <HStack gap="8" className={cls.articleInfo}>
          <Icon Svg={CalendarIcon} />
          <TextDeprecated text={article?.createdAt} />
        </HStack>
      </VStack>

      {article?.blocks.map(renderBlock)}
    </>
  );
};

const Redesign = () => {
  const article = useSelector(getArticleDetailsData);

  return (
    <>
      <Text title={article?.subtitle} size={'l'} bold />
      <Text title={article?.subtitle} />
      <AppImage
        fallback={
          <SkeletonRedesign width={'100%'} height={420} border="16px" />
        }
        src={article?.img}
        className={cls.img}
      />

      {article?.blocks.map(renderBlock)}
    </>
  );
};

const ArticleDetailsSkeleton = () => {
  const Skeleton = toggleFeatures({
    name: 'isAppRedesigned',
    off: () => SkeletonDeprecated,
    on: () => SkeletonRedesign,
  });

  return (
    <VStack gap="16" max>
      <Skeleton
        className={cls.avatar}
        width={200}
        height={200}
        border={'50%'}
      />
      <Skeleton className={cls.title} width={300} height={32} />
      <Skeleton className={cls.skeleton} width={600} height={24} />
      <Skeleton className={cls.skeleton} width={'100%'} height={200} />
      <Skeleton className={cls.skeleton} width={'100%'} height={200} />
    </VStack>
  );
};

export const ArticleDetails: FC<ArticleDetailsProps> = memo((props) => {
  const { className, id } = props;
  const { t } = useTranslation('article');
  const dispatch = useAppDispatch();

  const isLoading = useSelector(getArticleDetailsIsLoading);
  const error = useSelector(getArticleDetailsError);

  useEffect(() => {
    if (__PROJECT__ !== 'storybook') {
      dispatch(fetchArticleById(id));
    }
  }, [dispatch, id]);

  let content;

  if (isLoading) {
    content = <ArticleDetailsSkeleton />;
  } else if (error) {
    content = (
      <TextDeprecated
        align={TextAlign.CENTER}
        title={t('Произошла ошибка при загрузке статьи')}
      />
    );
  } else {
    content = (
      <ToggleFeatures
        feature="isAppRedesigned"
        off={<Deprecated />}
        on={<Redesign />}
      />
    );
  }

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <VStack
        max
        gap="16"
        className={classNames(cls.articleDetails, {}, [className])}
      >
        {content}
      </VStack>
    </DynamicModuleLoader>
  );
});
