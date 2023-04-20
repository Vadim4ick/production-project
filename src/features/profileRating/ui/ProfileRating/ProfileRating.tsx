import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import {
  useGetProfileRating,
  useRateProfile,
} from '../../api/profileRatingApi';

import { RatingCard } from '@/entities/Rating';
import { getAuthUserData } from '@/entities/User';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';

interface ProfileRatingProps {
  className?: string;
  profileId: string;
}

export const ProfileRating = memo((props: ProfileRatingProps) => {
  const { className, profileId } = props;
  const { t } = useTranslation();

  const userData = useSelector(getAuthUserData);

  const { data, isLoading } = useGetProfileRating({
    userId: userData?.id ?? '',
    profileId,
  });

  const [rateArticleMutation] = useRateProfile();

  const handleProfile = useCallback(
    (starsCount: number) => {
      try {
        rateArticleMutation({
          userId: userData?.id ?? '',
          profileId,
          rate: starsCount,
        });
      } catch (error) {}
    },
    [profileId, rateArticleMutation, userData?.id],
  );

  const onAccent = useCallback(
    (starsCount: number) => {
      handleProfile(starsCount);
    },
    [handleProfile],
  );

  if (isLoading) {
    return <Skeleton width={'100%'} height={120} />;
  }

  const rating = data?.[0];

  return (
    <RatingCard
      onAccent={onAccent}
      className={className}
      title={t('Оцените данный профиль')}
      rate={rating?.rate}
    />
  );
});
