import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import cls from './LoginForm.module.scss';
import Eye from 'shared/assets/icons/eye.svg';

interface LoginFormProps {
  className?: string;
}

export const LoginForm: React.FC<LoginFormProps> = (props) => {
  const { className } = props;

  const [pass, isPass] = useState(false);

  const onPass = () => {
    isPass((prev) => !prev);
  };

  const { t } = useTranslation();

  return (
    <div className={classNames(cls.loginForm, {}, [className as string])}>
      <Input
        autofocus
        type="text"
        className={cls.input}
        placeholder={t('Введите имя')}
      />

      <div className={cls.inpPass}>
        <Input
          type={pass ? 'text' : 'password'}
          className={`${cls.input}`}
          placeholder={t('Введите пароль')}
        />

        <Button onClick={onPass} theme={ThemeButton.CLEAR} className={cls.icon}>
          <Eye />
        </Button>
      </div>
      <Button className={cls.loginBtn}>{t('Войти')}</Button>
    </div>
  );
};
