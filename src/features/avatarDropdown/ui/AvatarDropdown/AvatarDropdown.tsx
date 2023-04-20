/* eslint-disable indent */
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import {
  getAuthUserData,
  isUserAdmin,
  isUserManager,
  userActions,
} from '@/entities/User';
import { RoutePath } from '@/shared/config/routeConfig/routeConfig';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Avatar } from '@/shared/ui/Avatar/Avatar';
import { Dropdown } from '@/shared/ui/Popups';

interface AvatarDropdownProps {
  className?: string;
}

export const AvatarDropdown = memo((props: AvatarDropdownProps) => {
  const { className } = props;
  const { t } = useTranslation();

  const authData = useSelector(getAuthUserData);
  const isAdmin = useSelector(isUserAdmin);
  const isManager = useSelector(isUserManager);

  const dispatch = useAppDispatch();

  const onLogoutModal = useCallback(() => {
    dispatch(userActions.logout());
  }, [dispatch]);

  const isAdminPanelAvailable = isAdmin || isManager;

  if (!authData) {
    return null;
  }

  return (
    <Dropdown
      className={classNames('', {}, [className])}
      direction="bottom left"
      items={[
        ...(isAdminPanelAvailable
          ? [
              {
                content: t('adminka'),
                href: RoutePath.admin_panel,
              },
            ]
          : []),
        {
          content: t('my-profile'),
          href: RoutePath.profile + authData.id,
        },
        { content: t('Выйти'), onClick: onLogoutModal },
      ]}
      trigger={<Avatar src={authData.avatar} size={30} />}
    />
  );
});
