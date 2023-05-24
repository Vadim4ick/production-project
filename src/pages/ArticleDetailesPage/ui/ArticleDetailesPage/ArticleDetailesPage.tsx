/* eslint-disable react-hooks/rules-of-hooks */
import { FC, memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { articleDetailsPageReducer } from '../../model/slices';
import { AdditionalInfoContainer } from '../AdditionalInfoContainer/AdditionalInfoContainer';
import { ArticleDetailsComments } from '../ArticleDetailsComments/ArticleDetailsComments';
import { ArticleDetailsPageHeader } from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader';
import { DetailsContainer } from '../DetailsContainer/DetailsContainer';

import cls from './ArticleDetailesPage.module.scss';
import { ArticleDetails } from '@/entities/Article';
import { ArticleRating } from '@/features/articleRating';
import { ArticleRecommendationsList } from '@/features/articleRecommendationsList';
import { StickyLayout } from '@/shared/layouts/StickyLayout';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
  DynamicModuleLoader,
  ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { ToggleFeatures, toggleFeatures } from '@/shared/lib/features';
import { Card } from '@/shared/ui/deprecated/Card';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Page } from '@/widgets/Page';

interface ArticleDetailesPageProps {
  className?: string;
}

const reducers: ReducersList = {
  articleDetailsPage: articleDetailsPageReducer,
};

const ArticleDetailesPage: FC<ArticleDetailesPageProps> = (props) => {
  const { className } = props;
  const { t } = useTranslation('');

  const { id } = useParams<{ id: string }>();

  if (!id) {
    return null;
  }

  toggleFeatures({
    name: 'isAppRedesigned',
    off: () => undefined,
    on: () =>
      useEffect(() => {
        window.scroll({ top: 0 });
      }, []),
  });

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <ToggleFeatures
        feature="isAppRedesigned"
        off={
          <Page
            className={classNames(cls.articleDetailesPage, {}, [className])}
          >
            <VStack gap="16" max>
              <ArticleDetailsPageHeader />
              <ArticleDetails id={id} />
              <ToggleFeatures
                feature={'isArticleRatingEnabled'}
                on={<ArticleRating articleId={id} />}
                off={<Card>{t('article-rating-coming-soon')}</Card>}
              />
              <ArticleRecommendationsList />
              <ArticleDetailsComments id={id} />
            </VStack>
          </Page>
        }
        on={
          <StickyLayout
            content={
              <Page
                className={classNames(cls.articleDetailesPage, {}, [className])}
              >
                <VStack gap="16" max>
                  <DetailsContainer />
                  <ArticleRating articleId={id} />
                  <ArticleRecommendationsList />
                  <ArticleDetailsComments id={id} />
                </VStack>
              </Page>
            }
            right={<AdditionalInfoContainer />}
          />
        }
      />
    </DynamicModuleLoader>
  );
};

export default memo(ArticleDetailesPage);
