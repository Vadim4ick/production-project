import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { ArticleList } from 'entities/Article';
import { classNames } from 'shared/lib/classNames/classNames';
import { HStack, VStack } from 'shared/ui/Stack';
import { Text, TextSize } from 'shared/ui/Text/Text';

import { useArticleRecommendationsList } from '../../api/articleRecommendationsApi';

interface ArticleRecommendationsListProps {
  className?: string;
}

export const ArticleRecommendationsList = memo(
  (props: ArticleRecommendationsListProps) => {
    const { className } = props;

    const { t } = useTranslation('article');

    const {
      isLoading,
      data: articles,
      error,
    } = useArticleRecommendationsList(4);

    if (isLoading || error || !articles) {
      return null;
    }

    return (
      // <VStack gap={'8'} className={classNames('', {}, [className])}>
      <>
        <Text size={TextSize.L} title={t('we-recommend')} />
        <ArticleList virtualized={false} target="_blank" articles={articles} />
      </>
      // </VStack>
    );
  },
);