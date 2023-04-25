import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import {
  useGetArticleRating,
  useRateArticle,
} from '../../api/articleRatingApi';

import { RatingCard } from '@/entities/Rating';
import { getAuthUserData } from '@/entities/User';
import { Skeleton } from '@/shared/ui/Skeleton';

export interface ArticleRatingProps {
  className?: string;
  articleId: string;
}

const ArticleRating = memo((props: ArticleRatingProps) => {
  const { className, articleId } = props;
  const { t } = useTranslation();

  const userData = useSelector(getAuthUserData);

  const { data, isLoading } = useGetArticleRating({
    articleId,
    userId: userData?.id ?? '',
  });

  const [rateArticleMutation] = useRateArticle();

  const handleRateArticle = useCallback(
    (starsCount: number, feedback?: string) => {
      try {
        rateArticleMutation({
          userId: userData?.id ?? '',
          articleId,
          rate: starsCount,
          feedback: feedback,
        });
      } catch (error) {
        console.log(error);
      }
    },
    [articleId, rateArticleMutation, userData?.id],
  );

  const onAccent = useCallback(
    (starsCount: number, feedback?: string) => {
      handleRateArticle(starsCount, feedback);
    },
    [handleRateArticle],
  );

  const onCancel = useCallback(
    (starsCount: number) => {
      handleRateArticle(starsCount);
    },
    [handleRateArticle],
  );

  if (isLoading) {
    return <Skeleton width={'100%'} height={120} />;
  }

  const rating = data?.[0];

  return (
    <RatingCard
      className={className}
      rate={rating?.rate}
      title={t('Оцените статью')}
      onCancel={onCancel}
      onAccent={onAccent}
      hasFeedback
      feedbackTitle={t(
        'Оставьте свой отзыв о статье, это поможет улучшить качество',
      )}
    />
  );
});

export default ArticleRating;
