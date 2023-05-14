import { useTranslation } from 'react-i18next';

import { Profile } from '../../model/types/profile';

import cls from './ProfileCard.module.scss';
import { Country, CountrySelect } from '@/entities/Country';
import { Currency, CurrencySelect } from '@/entities/Currency';
import { Mods, classNames } from '@/shared/lib/classNames/classNames';
import { Avatar } from '@/shared/ui/deprecated/Avatar';
import { Input } from '@/shared/ui/deprecated/Input';
import { Loader } from '@/shared/ui/deprecated/Loader';
import { HStack, VStack } from '@/shared/ui/deprecated/Stack';
import { Text, TextAlign, TextTheme } from '@/shared/ui/deprecated/Text';

interface ProfileCardProps {
  className?: string;
  data?: Profile;
  error?: string;
  isLoading?: boolean;
  readonly?: boolean;
  onChangeFirstName?: (value?: string) => void;
  onChangeLastName?: (value?: string) => void;
  onChangeCity?: (value?: string) => void;
  onChangeAge?: (value?: string) => void;
  onChangeAvatar?: (value?: string) => void;
  onChangeUsername?: (value?: string) => void;
  onChangeCurrency?: (currency: Currency) => void;
  onChangeCountry?: (country: Country) => void;
}

export const ProfileCard: React.FC<ProfileCardProps> = (props) => {
  const {
    className,
    data,
    error,
    isLoading,
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

  if (isLoading) {
    return (
      <HStack
        justify="center"
        max
        className={classNames(cls.profileCard, {}, [className, cls.loading])}
      >
        <Loader />
      </HStack>
    );
  }

  if (error) {
    return (
      <HStack
        justify="center"
        max
        className={classNames(cls.profileCard, {}, [className, cls.error])}
      >
        <Text
          theme={TextTheme.ERROR}
          text={t('Попробуйте обновить страницу')}
          title={t('Произошла ошибка при загрузке профиля')}
          align={TextAlign.CENTER}
        />
      </HStack>
    );
  }

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
          <Avatar src={data?.avatar} />
        </div>
      )}

      <VStack max align={'none'} gap="8" className={cls.inputsBlock}>
        <Input
          value={data?.first}
          className={cls.input}
          placeholder={t('Ваше имя')}
          onChange={onChangeFirstName}
          readonly={readonly}
          data-testid={'ProfileCard.firstname'}
        />
        <Input
          value={data?.lastname}
          className={cls.input}
          placeholder={t('Ваша фамиля')}
          onChange={onChangeLastName}
          readonly={readonly}
          data-testid={'ProfileCard.lastname'}
        />
        <Input
          value={data?.age}
          className={cls.input}
          placeholder={t('Ваш возраст')}
          onChange={onChangeAge}
          readonly={readonly}
        />
        <Input
          value={data?.city}
          className={cls.input}
          placeholder={t('Ваш город')}
          onChange={onChangeCity}
          readonly={readonly}
        />
        <Input
          value={data?.username}
          className={cls.input}
          placeholder={t('Имя пользователя')}
          onChange={onChangeUsername}
          readonly={readonly}
        />
        <Input
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
};
