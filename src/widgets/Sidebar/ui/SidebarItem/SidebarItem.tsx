import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { SidebarItemType } from '../../model/types/sidebar';

import cls from './SidebarItem.module.scss';
import { getAuthUserData } from '@/entities/User';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppLink, AppLinkTheme } from '@/shared/ui/AppLink';

interface SidebarItemProps {
  item: SidebarItemType;
  collapsed: boolean;
  authOnly?: boolean;
}

export const SidebarItem: React.FC<SidebarItemProps> = memo((props) => {
  const { item, collapsed } = props;
  const { t } = useTranslation();

  const isAuth = useSelector(getAuthUserData);

  if (item.authOnly && !isAuth) {
    return null;
  }

  return (
    <AppLink
      className={classNames(cls.item, { [cls.collapsed]: collapsed }, [])}
      theme={AppLinkTheme.SECONDARY}
      to={item.path}
    >
      <item.Icon className={cls.icon} />
      <span className={cls.link}>{t(item.text)}</span>
    </AppLink>
  );
});
