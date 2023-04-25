import { memo, useCallback, useState } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';

import cls from './NotificationButton.module.scss';
import { NotificationList } from '@/entities/Notification';
import NotificationSvg from '@/shared/assets/icons/bell.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button, ThemeButton } from '@/shared/ui/Button';
import { Drawer } from '@/shared/ui/Drawer';
import { Icon } from '@/shared/ui/Icon';
import { Popover } from '@/shared/ui/Popups';

interface NotificationButtonProps {
  className?: string;
}

export const NotificationButton = memo((props: NotificationButtonProps) => {
  const { className } = props;

  const [isOpen, setIsOpen] = useState(false);

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
      <BrowserView>
        <Popover
          className={classNames(cls.notificationButton, {}, [className])}
          direction={'bottom left'}
          trigger={trigger}
        >
          <NotificationList className={cls.notifications} />
        </Popover>
      </BrowserView>

      <MobileView>
        {trigger}

        <Drawer isOpen={isOpen} onClose={onCloseDrawer}>
          <NotificationList />
        </Drawer>
      </MobileView>
    </div>
  );
});
