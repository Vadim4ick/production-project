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
import {
  getRouteAdmin,
  getRouteProfile,
  getRouteSettings,
} from '@/shared/const/router';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Avatar as AvatarDeprecated } from '@/shared/ui/deprecated/Avatar';
import { Dropdown as DropdownDeprecated } from '@/shared/ui/deprecated/Popups';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Dropdown } from '@/shared/ui/redesigned/Popups';

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

  const items = [
    ...(isAdminPanelAvailable
      ? [
          {
            content: t('adminka'),
            href: getRouteAdmin(),
          },
        ]
      : []),
    {
      content: t('nastroiki'),
      href: getRouteSettings(),
    },
    {
      content: t('my-profile'),
      href: getRouteProfile(authData.id),
    },
    { content: t('Выйти'), onClick: onLogoutModal },
  ];

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      off={
        <DropdownDeprecated
          className={classNames('', {}, [className])}
          direction="bottom left"
          items={items}
          trigger={
            <AvatarDeprecated
              fallbackInverted
              src={authData.avatar}
              size={30}
            />
          }
        />
      }
      on={
        <Dropdown
          className={classNames('', {}, [className])}
          direction="bottom left"
          items={items}
          trigger={<Avatar src={authData.avatar} size={40} />}
        />
      }
    />
  );
});
