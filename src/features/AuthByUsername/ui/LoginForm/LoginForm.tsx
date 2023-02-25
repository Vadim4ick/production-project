import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import cls from './LoginForm.module.scss';
import Eye from 'shared/assets/icons/eye.svg';
import { useDispatch, useSelector } from 'react-redux';
import { loginActions } from '../../model/slice/loginSlice';
import { getLoginState } from '../../model/selectors/getLoginState/getLoginState';
import { loginByUsername } from '../../model/servies/loginByUsername/loginByUsername';
import { Text, TextTheme } from 'shared/ui/Text/Text';

interface LoginFormProps {
  className?: string;
}

export const LoginForm: React.FC<LoginFormProps> = memo((props) => {
  const { className } = props;
  const dispatch = useDispatch();
  const { username, password, error, isLoading } = useSelector(getLoginState);

  const [pass, isPass] = useState(false);

  const onChangeUsername = useCallback(
    (value: string) => {
      dispatch(loginActions.setUsername(value));
    },
    [dispatch],
  );

  const onChangePassword = useCallback(
    (value: string) => {
      dispatch(loginActions.setPassword(value));
    },
    [dispatch],
  );

  const onLoginClick = useCallback(() => {
    dispatch(loginByUsername({ username, password }));
  }, [dispatch, password, username]);

  const onPass = useCallback(() => {
    isPass((prev) => !prev);
  }, []);

  const { t } = useTranslation();

  return (
    <div className={classNames(cls.loginForm, {}, [className as string])}>
      <Text title={t('Форма авторизации')} />
      {error && (
        <Text
          text={t('Вы ввели неверный логин или пароль')}
          theme={TextTheme.ERROR}
        />
      )}

      <Input
        autofocus
        type="text"
        className={cls.input}
        placeholder={t('Введите имя')}
        onChange={onChangeUsername}
        value={username}
      />

      <div className={cls.inpPass}>
        <Input
          type={pass ? 'text' : 'password'}
          className={`${cls.input}`}
          placeholder={t('Введите пароль')}
          onChange={onChangePassword}
          value={password}
        />

        <Button onClick={onPass} theme={ThemeButton.CLEAR} className={cls.icon}>
          <Eye />
        </Button>
      </div>

      <Button
        onClick={onLoginClick}
        theme={ThemeButton.OUTLINE}
        className={cls.loginBtn}
        disabled={isLoading}
      >
        {t('Войти')}
      </Button>
    </div>
  );
});
