import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import cls from './Navbar.module.scss';
import { getAuthUserData } from '@/entities/User';
import { LoginModal } from '@/features/AuthByUsername';
import { AvatarDropdown } from '@/features/avatarDropdown';
import { NotificationButton } from '@/features/notificationButton';
import { getRouteArticlesCreate } from '@/shared/const/router';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures, toggleFeatures } from '@/shared/lib/features';
import { AppLink, AppLinkTheme } from '@/shared/ui/deprecated/AppLink';
import {
  Button as ButtonDeprecated,
  ThemeButton,
} from '@/shared/ui/deprecated/Button';
import { Text, TextTheme } from '@/shared/ui/deprecated/Text';
import { Button } from '@/shared/ui/redesigned/Button';
import { HStack } from '@/shared/ui/redesigned/Stack';

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

  const mainClass = toggleFeatures({
    name: 'isAppRedesigned',
    off: () => cls.navbar,
    on: () => cls.navbarRedesigned,
  });

  if (authData) {
    return (
      <ToggleFeatures
        feature="isAppRedesigned"
        off={
          <header className={classNames(mainClass, {}, [className as string])}>
            <Text
              theme={TextTheme.INVERTED}
              className={cls.appName}
              title={t('news')}
            />
            <AppLink
              className={cls.createBtn}
              theme={AppLinkTheme.SECONDARY}
              to={getRouteArticlesCreate()}
            >
              {t('create-an-article')}
            </AppLink>

            <HStack gap="16" className={cls.actions}>
              <NotificationButton />
              <AvatarDropdown />
            </HStack>
          </header>
        }
        on={
          <header className={classNames(mainClass, {}, [className as string])}>
            <HStack gap="16" className={cls.actions}>
              <NotificationButton />
              <AvatarDropdown />
            </HStack>
          </header>
        }
      />
    );
  }

  return (
    <header className={classNames(mainClass, {}, [className as string])}>
      <ToggleFeatures
        feature="isAppRedesigned"
        off={
          <ButtonDeprecated
            theme={ThemeButton.CLEAR_INVERTED}
            className={cls.links}
            onClick={onCloseModal}
          >
            {t('Войти')}
          </ButtonDeprecated>
        }
        on={
          <Button variant="clear" className={cls.links} onClick={onCloseModal}>
            {t('Войти')}
          </Button>
        }
      />

      {isAuthModal && (
        <LoginModal isOpen={isAuthModal} onClose={onCloseModal} />
      )}
    </header>
  );
});
