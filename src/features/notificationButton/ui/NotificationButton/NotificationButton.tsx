import { memo, useCallback, useState } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import { useSelector } from 'react-redux';

import {
  useNotifications,
  useUpdateNotification,
} from '../../api/notificationApi';

import cls from './NotificationButton.module.scss';
import { NotificationList } from '@/entities/Notification';
import { getAuthUserData } from '@/entities/User';
import NotificationSvg from '@/shared/assets/icons/bell.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button, ThemeButton } from '@/shared/ui/deprecated/Button';
import { Drawer } from '@/shared/ui/deprecated/Drawer';
import { Icon } from '@/shared/ui/deprecated/Icon';
import { Popover } from '@/shared/ui/deprecated/Popups';
import { Text, TextTheme } from '@/shared/ui/deprecated/Text';

interface NotificationButtonProps {
  className?: string;
}

export const NotificationButton = memo((props: NotificationButtonProps) => {
  const { className } = props;

  const [isOpen, setIsOpen] = useState(false);

  const userData = useSelector(getAuthUserData);

  const {
    data: notifications,
    isLoading,
    refetch,
  } = useNotifications(
    { profileId: userData?.id || '' },
    {
      pollingInterval: 20000,
      refetchOnMountOrArgChange: true,
    },
  );

  const [updateNotification] = useUpdateNotification();

  const handleNotification = useCallback(
    (notificationId: string) => {
      if (notifications) {
        try {
          const notificationToUpdate = notifications.find(
            (n) => n.id === notificationId,
          );

          if (notificationToUpdate && !notificationToUpdate.isRead) {
            updateNotification({ ...notificationToUpdate, isRead: true });
          }
        } catch (error) {
          console.log(error);
        } finally {
          refetch();
        }
      }
    },
    [notifications, refetch, updateNotification],
  );

  const notificationsCount =
    notifications?.filter((n) => !n.isRead).length || '';

  const onOpenDrawer = useCallback(() => {
    setIsOpen(true);
  }, []);

  const onCloseDrawer = useCallback(() => {
    setIsOpen(false);
  }, []);

  const trigger = (
    <Button onClick={onOpenDrawer} theme={ThemeButton.CLEAR}>
      <Icon inverted Svg={NotificationSvg} />
    </Button>
  );

  return (
    <div>
      <BrowserView className={cls.notificationContainer}>
        <Text
          className={cls.notificationCount}
          theme={TextTheme.INVERTED}
          text={String(notificationsCount)}
        />

        <Popover
          className={classNames(cls.notificationButton, {}, [className])}
          direction={'bottom left'}
          trigger={trigger}
        >
          <NotificationList
            isLoading={isLoading}
            notifications={notifications}
            handleNotification={handleNotification}
            className={cls.notifications}
          />
        </Popover>
      </BrowserView>

      <MobileView>
        {trigger}

        <Drawer isOpen={isOpen} onClose={onCloseDrawer}>
          <NotificationList
            isLoading={isLoading}
            notifications={notifications}
            handleNotification={handleNotification}
          />
        </Drawer>
      </MobileView>
    </div>
  );
});
