import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { Notification } from '../../model/types/notification';
import { NotificationItem } from '../NotificationItem/NotificationItem';

import cls from './NotificationList.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Skeleton } from '@/shared/ui/deprecated/Skeleton';
import { Text } from '@/shared/ui/deprecated/Text';
import { VStack } from '@/shared/ui/redesigned/Stack';

interface NotificationListProps {
  className?: string;
  isLoading?: boolean;
  notifications?: Notification[];
  handleNotification: (notificationId: string) => void;
}

export const NotificationList = memo((props: NotificationListProps) => {
  const { className, handleNotification, notifications, isLoading } = props;
  const { t } = useTranslation();

  if (notifications?.length === 0) {
    return (
      <div style={{ minWidth: '200px' }}>
        <Text text={t('Not found')} />
      </div>
    );
  }

  // const userData = useSelector(getAuthUserData);

  // const { data, isLoading, refetch } = useNotifications(
  //   { profileId: userData?.id || '' },
  //   {
  //     pollingInterval: 10000,
  //     refetchOnMountOrArgChange: true,
  //   },
  // );

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
      {notifications?.map((item) => (
        <NotificationItem
          onRead={handleNotification}
          key={item.id}
          item={item}
        />
      ))}
    </VStack>
  );
});
