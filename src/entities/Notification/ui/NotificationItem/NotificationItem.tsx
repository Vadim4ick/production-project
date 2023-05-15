import { memo } from 'react';

import { Notification } from '../../model/types/notification';

import cls from './NotificationItem.module.scss';
import IconCancel from '@/shared/assets/icons/cancel.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';
import {
  Button as ButtonDeprecated,
  ButtonSize,
  ThemeButton,
} from '@/shared/ui/deprecated/Button';
import { Card as CardDeprecated, CardTheme } from '@/shared/ui/deprecated/Card';
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { Card } from '@/shared/ui/redesigned/Card';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { Text } from '@/shared/ui/redesigned/Text';

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
    <ToggleFeatures
      feature="isAppRedesigned"
      off={
        <CardDeprecated
          theme={CardTheme.OUTLINED}
          className={classNames(cls.notificationItem, {}, [className])}
        >
          <div className={cls.content}>
            <TextDeprecated title={item.title} text={item.description} />
            <TextDeprecated text={new Date(item.date).toLocaleDateString()} />
          </div>

          <ButtonDeprecated
            theme={ThemeButton.CLEAR}
            size={ButtonSize.L}
            className={cls.clearBtn}
            onClick={handleCheckboxChange}
          >
            <IconDeprecated Svg={IconCancel} />
          </ButtonDeprecated>
        </CardDeprecated>
      }
      on={
        <Card className={classNames(cls.notificationItem, {}, [className])}>
          <div className={cls.content}>
            <Text title={item.title} text={item.description} />
            <Text text={new Date(item.date).toLocaleDateString()} />
          </div>

          <Icon onClick={handleCheckboxChange} clickable Svg={IconCancel} />
        </Card>
      }
    />
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
