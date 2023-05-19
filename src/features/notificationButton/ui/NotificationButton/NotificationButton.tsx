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
import NotificationSvgDeprecated from '@/shared/assets/icons/bell.svg';
import NotificationSvg from '@/shared/assets/icons/notification.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';
import {
  Button as ButtonDeprecated,
  ThemeButton,
} from '@/shared/ui/deprecated/Button';
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon';
import { Popover as PopoverDeprecated } from '@/shared/ui/deprecated/Popups';
import { Text as TextDeprecated, TextTheme } from '@/shared/ui/deprecated/Text';
import { Drawer } from '@/shared/ui/redesigned/Drawer';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { Popover } from '@/shared/ui/redesigned/Popups';
import { Text } from '@/shared/ui/redesigned/Text';

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
    <ToggleFeatures
      feature="isAppRedesigned"
      off={
        <ButtonDeprecated onClick={onOpenDrawer} theme={ThemeButton.CLEAR}>
          <IconDeprecated inverted Svg={NotificationSvgDeprecated} />
        </ButtonDeprecated>
      }
      on={<Icon onClick={onOpenDrawer} clickable Svg={NotificationSvg} />}
    />
  );

  return (
    <div>
      <BrowserView className={cls.notificationContainer}>
        <ToggleFeatures
          feature="isAppRedesigned"
          off={
            <>
              <TextDeprecated
                className={cls.notificationCount}
                theme={TextTheme.PRIMARY}
                text={String(notificationsCount)}
              />
              <PopoverDeprecated
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
              </PopoverDeprecated>
            </>
          }
          on={
            <>
              <Text
                className={cls.notificationCount}
                variant="primary"
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
            </>
          }
        />
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
