import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { getAuthUserData, userActions } from 'entities/User';
import { LoginModal } from 'features/AuthByUsername';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { classNames } from 'shared/lib/classNames/classNames';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { Dropdown } from 'shared/ui/Dropdown/Dropdown';
import { Text, TextTheme } from 'shared/ui/Text/Text';

import cls from './Navbar.module.scss';

interface NavbarProps {
  className?: string;
}

export const Navbar = memo(({ className }: NavbarProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [isAuthModal, setIsAuthModal] = useState(false);

  const authData = useSelector(getAuthUserData);

  const onCloseModal = useCallback(() => {
    setIsAuthModal((prev) => !prev);
  }, []);

  const onLogoutModal = useCallback(() => {
    dispatch(userActions.logout());
  }, [dispatch]);

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

        <Dropdown
          direction="bottom left"
          className={cls.dropdown}
          items={[
            {
              content: t('Профиль'),
              href: RoutePath.profile + authData.id,
            },
            { content: t('Выйти'), onClick: onLogoutModal },
          ]}
          trigger={<Avatar src={authData.avatar} size={30} />}
        />
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
