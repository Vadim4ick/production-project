import { memo } from 'react';

import { Notification } from '../../model/types/notification';

import cls from './NotificationItem.module.scss';
import IconCancel from '@/shared/assets/icons/cancel.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button, ButtonSize, ThemeButton } from '@/shared/ui/deprecated/Button';
import { Card, CardTheme } from '@/shared/ui/deprecated/Card';
import { Icon } from '@/shared/ui/deprecated/Icon';
import { Text } from '@/shared/ui/deprecated/Text';

interface NotificationItemProps {
  className?: string;
  item: Notification;
  onRead: (notificationId: string) => void;
}

export const NotificationItem = memo((props: NotificationItemProps) => {
  const { className, item, onRead } = props;

  const handleCheckboxChange = () => {
    if (!item.isRead) {
      onRead?.(item.id);
    }
  };

  const content = (
    <Card
      theme={CardTheme.OUTLINED}
      className={classNames(cls.notificationItem, {}, [className])}
    >
      <div className={cls.content}>
        <Text title={item.title} text={item.description} />
        <Text text={new Date(item.date).toLocaleDateString()} />
      </div>

      <Button
        theme={ThemeButton.CLEAR}
        size={ButtonSize.L}
        className={cls.clearBtn}
        onClick={handleCheckboxChange}
      >
        <Icon Svg={IconCancel} />
      </Button>
    </Card>
  );

  if (item.href) {
    return (
      <a
        className={cls.link}
        target="_blank"
        href={item.href}
        rel={'noreferrer'}
      >
        {content}
      </a>
    );
  }

  return content;
});
