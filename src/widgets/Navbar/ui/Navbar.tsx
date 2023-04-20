/* eslint-disable indent */
import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { getAuthUserData } from '@/entities/User';
import { LoginModal } from '@/features/AuthByUsername';
import { AvatarDropdown } from '@/features/avatarDropdown';
import { NotificationButton } from '@/features/notificationButton';
import { RoutePath } from '@/shared/config/routeConfig/routeConfig';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppLink, AppLinkTheme } from '@/shared/ui/AppLink/AppLink';
import { Button, ThemeButton } from '@/shared/ui/Button/Button';
import { HStack } from '@/shared/ui/Stack';
import { Text, TextTheme } from '@/shared/ui/Text/Text';

import cls from './Navbar.module.scss';

interface NavbarProps {
  className?: string;
}

export const Navbar = memo(({ className }: NavbarProps) => {
  const { t } = useTranslation();

  const [isAuthModal, setIsAuthModal] = useState(false);

  const authData = useSelector(getAuthUserData);

  const onCloseModal = useCallback(() => {
    setIsAuthModal((prev) => !prev);
  }, []);

  if (authData) {
    return (
      <header className={classNames(cls.navbar, {}, [className as string])}>
        <Text
          theme={TextTheme.INVERTED}
          className={cls.appName}
          title={t('news')}
        />
        <AppLink
          className={cls.createBtn}
          theme={AppLinkTheme.SECONDARY}
          to={RoutePath.article_create}
        >
          {t('create-an-article')}
        </AppLink>

        <HStack gap="16" className={cls.actions}>
          <NotificationButton />
          <AvatarDropdown />
        </HStack>
      </header>
    );
  }

  return (
    <header className={classNames(cls.navbar, {}, [className as string])}>
      <Button
        theme={ThemeButton.CLEAR_INVERTED}
        className={cls.links}
        onClick={onCloseModal}
      >
        {t('Войти')}
      </Button>

      {isAuthModal && (
        <LoginModal isOpen={isAuthModal} onClose={onCloseModal} />
      )}
    </header>
  );
});
