import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import {
  useGetProfileRating,
  useNotificationsProfile,
  useRateProfile,
} from '../../api/profileRatingApi';

import { RatingCard } from '@/entities/Rating';
import { getAuthUserData } from '@/entities/User';
import { getRouteProfile } from '@/shared/const/router';
import { Skeleton } from '@/shared/ui/deprecated/Skeleton';

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
  const [rateNotificationMutation] = useNotificationsProfile();

  const handleProfile = useCallback(
    (starsCount: number) => {
      try {
        rateArticleMutation({
          userId: userData?.id ?? '',
          profileId,
          rate: starsCount,
        });

        rateNotificationMutation({
          userId: userData?.id ?? '',
          description: `Пользователь ${userData?.username} поставил вам ${starsCount} звезд`,
          title: 'Вам поставили лайк',
          date: new Date().toISOString(),
          profileId,
          isRead: false,
          href: getRouteProfile(userData?.id as string),
        });
      } catch (error) {
        console.log(error);
      }
    },
    [
      profileId,
      rateArticleMutation,
      rateNotificationMutation,
      userData?.id,
      userData?.username,
    ],
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
