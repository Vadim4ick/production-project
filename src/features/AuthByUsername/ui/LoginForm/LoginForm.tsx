import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { getLoginError } from '../../model/selectors/getLoginError/getLoginError';
import { getLoginIsLoading } from '../../model/selectors/getLoginLoading/getLoginLoading';
import { getLoginPassword } from '../../model/selectors/getLoginPassword/getLoginPassword';
import { getLoginUsername } from '../../model/selectors/getLoginUsername/getLoginUsername';
import { loginByUsername } from '../../model/servies/loginByUsername/loginByUsername';
import { loginActions, loginReducer } from '../../model/slice/loginSlice';

import cls from './LoginForm.module.scss';
import Eye from '@/shared/assets/icons/eye.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
  DynamicModuleLoader,
  ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { ToggleFeatures } from '@/shared/lib/features';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
  Button as ButtonRedesign,
  ThemeButton,
} from '@/shared/ui/deprecated/Button';
import { Input as InputRedesign } from '@/shared/ui/deprecated/Input';
import { Text as TextDeprecated, TextTheme } from '@/shared/ui/deprecated/Text';
import { Button } from '@/shared/ui/redesigned/Button';
import { Input } from '@/shared/ui/redesigned/Input';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

export interface LoginFormProps {
  className?: string;
  onSuccess: () => void;
}

const initialReducers: ReducersList = {
  loginForm: loginReducer,
};

const LoginForm: React.FC<LoginFormProps> = memo((props) => {
  const { className, onSuccess } = props;

  const dispatch = useAppDispatch();

  const username = useSelector(getLoginUsername);
  const password = useSelector(getLoginPassword);
  const isLoading = useSelector(getLoginIsLoading);
  const error = useSelector(getLoginError);

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

  const onLoginClick = useCallback(async () => {
    const result = await dispatch(loginByUsername({ username, password }));

    if (result.meta.requestStatus === 'fulfilled') {
      onSuccess();
    }
  }, [onSuccess, dispatch, password, username]);

  const onPass = useCallback(() => {
    isPass((prev) => !prev);
  }, []);

  const { t } = useTranslation();

  return (
    <DynamicModuleLoader removeAfterUnmount reducers={initialReducers}>
      <ToggleFeatures
        feature="isAppRedesigned"
        off={
          <div className={classNames(cls.loginForm, {}, [className as string])}>
            <TextDeprecated title={t('Форма авторизации')} />
            {error && (
              <TextDeprecated
                text={t('Вы ввели неверный логин или пароль')}
                theme={TextTheme.ERROR}
              />
            )}

            <InputRedesign
              autofocus
              type="text"
              className={cls.input}
              placeholder={t('Введите имя')}
              onChange={onChangeUsername}
              value={username}
            />

            <div className={cls.inpPass}>
              <InputRedesign
                type={pass ? 'text' : 'password'}
                className={`${cls.input}`}
                placeholder={t('Введите пароль')}
                onChange={onChangePassword}
                value={password}
              />

              <ButtonRedesign
                onClick={onPass}
                theme={ThemeButton.CLEAR}
                className={cls.icon}
              >
                <Eye />
              </ButtonRedesign>
            </div>

            <ButtonRedesign
              onClick={onLoginClick}
              theme={ThemeButton.OUTLINE}
              className={cls.loginBtn}
              disabled={isLoading}
            >
              {t('Войти')}
            </ButtonRedesign>
          </div>
        }
        on={
          <VStack
            className={classNames(cls.loginFormRedesign, {}, [
              className as string,
            ])}
            gap="16"
          >
            <Text title={t('Форма авторизации')} />
            {error && (
              <Text
                text={t('Вы ввели неверный логин или пароль')}
                variant="error"
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
              <Button onClick={onPass} variant="clear" className={cls.icon}>
                <Eye />
              </Button>
            </div>

            <Button
              onClick={onLoginClick}
              variant="outline"
              className={cls.loginBtn}
              disabled={isLoading}
            >
              {t('Войти')}
            </Button>
          </VStack>
        }
      />
    </DynamicModuleLoader>
  );
});

export default LoginForm;
