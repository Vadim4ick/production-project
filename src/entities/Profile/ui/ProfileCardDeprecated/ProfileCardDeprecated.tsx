import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { ProfileCardProps } from '../ProfileCard/ProfileCard';

import cls from './ProfileCardDeprecated.module.scss';
import { CountrySelect } from '@/entities/Country';
import { CurrencySelect } from '@/entities/Currency';
import { Mods, classNames } from '@/shared/lib/classNames/classNames';
import { Avatar as AvatarDeprecated } from '@/shared/ui/deprecated/Avatar';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input';
import { Loader } from '@/shared/ui/deprecated/Loader';
import {
  TextAlign,
  Text as TextDeprecated,
  TextTheme,
} from '@/shared/ui/deprecated/Text';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';

export const ProfileCardDeprecatedError = () => {
  const { t } = useTranslation('profile');

  return (
    <HStack
      justify="center"
      max
      className={classNames(cls.profileCard, {}, [cls.error])}
    >
      <TextDeprecated
        theme={TextTheme.ERROR}
        text={t('Попробуйте обновить страницу')}
        title={t('Произошла ошибка при загрузке профиля')}
        align={TextAlign.CENTER}
      />
    </HStack>
  );
};

export const ProfileCardDeprecatedLoader = () => {
  return (
    <HStack
      justify="center"
      max
      className={classNames(cls.profileCard, {}, [cls.loading])}
    >
      <Loader />
    </HStack>
  );
};

export const ProfileCardDeprecated = memo((props: ProfileCardProps) => {
  const {
    className,
    data,
    readonly,
    onChangeFirstName,
    onChangeLastName,
    onChangeCity,
    onChangeAge,
    onChangeAvatar,
    onChangeUsername,
    onChangeCountry,
    onChangeCurrency,
  } = props;

  const { t } = useTranslation('profile');

  const mods: Mods = {
    [cls.editing]: !readonly,
  };

  return (
    <VStack
      gap="8"
      max
      className={classNames(cls.profileCard, mods, [className])}
    >
      {data?.avatar && (
        <div className={cls.avatarWrapper}>
          <AvatarDeprecated src={data?.avatar} />
        </div>
      )}

      <VStack max align={'none'} gap="8" className={cls.inputsBlock}>
        <InputDeprecated
          value={data?.first}
          className={cls.input}
          placeholder={t('Ваше имя')}
          onChange={onChangeFirstName}
          readonly={readonly}
          data-testid={'ProfileCard.firstname'}
        />
        <InputDeprecated
          value={data?.lastname}
          className={cls.input}
          placeholder={t('Ваша фамиля')}
          onChange={onChangeLastName}
          readonly={readonly}
          data-testid={'ProfileCard.lastname'}
        />
        <InputDeprecated
          value={data?.age}
          className={cls.input}
          placeholder={t('Ваш возраст')}
          onChange={onChangeAge}
          readonly={readonly}
        />
        <InputDeprecated
          value={data?.city}
          className={cls.input}
          placeholder={t('Ваш город')}
          onChange={onChangeCity}
          readonly={readonly}
        />
        <InputDeprecated
          value={data?.username}
          className={cls.input}
          placeholder={t('Имя пользователя')}
          onChange={onChangeUsername}
          readonly={readonly}
        />
        <InputDeprecated
          value={data?.avatar}
          className={cls.input}
          placeholder={t('Ваш аватар')}
          onChange={onChangeAvatar}
          readonly={readonly}
        />

        <CurrencySelect
          className={cls.input}
          value={data?.currency}
          onChange={onChangeCurrency}
          readonly={readonly}
        />

        <CountrySelect
          className={cls.input}
          value={data?.country}
          onChange={onChangeCountry}
          readonly={readonly}
        />
      </VStack>
    </VStack>
  );
});
