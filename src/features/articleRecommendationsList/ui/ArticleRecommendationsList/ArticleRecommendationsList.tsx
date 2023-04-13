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
      <>
        <Text size={TextSize.L} title={t('we-recommend')} />

        <HStack gap={'32'} className={classNames('', {}, [className])}>
          <ArticleList
            virtualized={false}
            target="_blank"
            articles={articles}
          />
        </HStack>
      </>
    );
  },
);
