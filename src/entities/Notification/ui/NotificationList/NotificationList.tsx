import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { useNotifications } from '../../api/notificationApi';
import { NotificationItem } from '../NotificationItem/NotificationItem';

import cls from './NotificationList.module.scss';
import { getAuthUserData } from '@/entities/User';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Skeleton } from '@/shared/ui/Skeleton';
import { VStack } from '@/shared/ui/Stack';

interface NotificationListProps {
  className?: string;
}

export const NotificationList = memo((props: NotificationListProps) => {
  const { className } = props;
  const { t } = useTranslation();

  const userData = useSelector(getAuthUserData);

  const { data, isLoading } = useNotifications(
    { profileId: userData?.id || '' },
    {
      pollingInterval: 10000,
    },
  );

  if (isLoading) {
    return (
      <VStack
        gap="16"
        className={classNames(cls.notificationList, {}, [className])}
      >
        <Skeleton width={'100%'} border={'8px'} height={'80px'} />
        <Skeleton width={'100%'} border={'8px'} height={'80px'} />
        <Skeleton width={'100%'} border={'8px'} height={'80px'} />
      </VStack>
    );
  }

  return (
    <VStack
      gap="16"
      className={classNames(cls.notificationList, {}, [className])}
    >
      {data?.map((item) => (
        <NotificationItem key={item.id} item={item} />
      ))}
    </VStack>
  );
});
