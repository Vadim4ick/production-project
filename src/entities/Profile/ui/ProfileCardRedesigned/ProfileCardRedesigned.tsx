import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { ProfileCardProps } from '../ProfileCard/ProfileCard';

import { CountrySelect } from '@/entities/Country';
import { CurrencySelect } from '@/entities/Currency';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Card } from '@/shared/ui/redesigned/Card';
import { Input } from '@/shared/ui/redesigned/Input';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

export const ProfileCardRedesignedError = () => {
  const { t } = useTranslation('profile');

  return (
    <HStack justify="center" max>
      <Text
        variant={'error'}
        text={t('Попробуйте обновить страницу')}
        title={t('Произошла ошибка при загрузке профиля')}
        align={'center'}
      />
    </HStack>
  );
};

export const ProfileCardRedesignedSkeleton = () => {
  return (
    <Card padding="24" max>
      <VStack gap="32">
        <HStack max justify="center">
          <Skeleton border="100%" width={128} height={128} />
        </HStack>

        <HStack gap="32" max>
          <VStack gap="16" max>
            <Skeleton width={'100%'} height={'38px'} />
            <Skeleton width={'100%'} height={'38px'} />
            <Skeleton width={'100%'} height={'38px'} />
            <Skeleton width={'100%'} height={'38px'} />
          </VStack>

          <VStack gap="16" max>
            <Skeleton width={'100%'} height={'38px'} />
            <Skeleton width={'100%'} height={'38px'} />
            <Skeleton width={'100%'} height={'38px'} />
            <Skeleton width={'100%'} height={'38px'} />
          </VStack>
        </HStack>
      </VStack>
    </Card>
  );
};

export const ProfileCardRedesigned = memo((props: ProfileCardProps) => {
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

  return (
    <Card
      border="partial"
      padding="24"
      max
      className={classNames('', {}, [className])}
    >
      <VStack gap="32">
        {data?.avatar && (
          <HStack max justify="center">
            <Avatar size={128} src={data?.avatar} />
          </HStack>
        )}

        <HStack gap="24" max>
          <VStack gap="16" max>
            <Input
              value={data?.first}
              label={t('Ваше имя')}
              onChange={onChangeFirstName}
              readonly={readonly}
              data-testid={'ProfileCard.firstname'}
            />
            <Input
              value={data?.lastname}
              label={t('Ваша фамиля')}
              onChange={onChangeLastName}
              readonly={readonly}
              data-testid={'ProfileCard.lastname'}
            />
            <Input
              value={data?.age}
              label={t('Ваш возраст')}
              onChange={onChangeAge}
              readonly={readonly}
            />
            <Input
              value={data?.city}
              label={t('Ваш город')}
              onChange={onChangeCity}
              readonly={readonly}
            />
          </VStack>

          <VStack gap="16" max>
            <Input
              value={data?.username}
              label={t('Имя пользователя')}
              onChange={onChangeUsername}
              readonly={readonly}
            />
            <Input
              value={data?.avatar}
              label={t('Ваш аватар')}
              onChange={onChangeAvatar}
              readonly={readonly}
            />

            <CurrencySelect
              value={data?.currency}
              onChange={onChangeCurrency}
              readonly={readonly}
            />

            <CountrySelect
              value={data?.country}
              onChange={onChangeCountry}
              readonly={readonly}
            />
          </VStack>
        </HStack>
      </VStack>
    </Card>
  );
});
