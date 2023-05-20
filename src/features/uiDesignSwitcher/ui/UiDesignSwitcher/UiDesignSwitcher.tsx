import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { getAuthUserData } from '@/entities/User';
import { getFeatureFlag, updateFeatureFlag } from '@/shared/lib/features';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useForceUpdate } from '@/shared/lib/render/forceUpdate';
import { ListBox } from '@/shared/ui/redesigned/Popups';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

interface UiDesignSwitcherProps {
  className?: string;
}

export const UiDesignSwitcher = memo((props: UiDesignSwitcherProps) => {
  const { className } = props;
  const { t } = useTranslation('settings');

  const [isLoading, setIsLoading] = useState(false);

  const isAppRedesign = getFeatureFlag('isAppRedesigned');

  const dispatch = useAppDispatch();
  const authData = useSelector(getAuthUserData);

  const forceUpdate = useForceUpdate();

  const items = [
    {
      content: t('novyi'),
      value: 'new',
    },
    {
      content: t('staryi'),
      value: 'old',
    },
  ];

  const onChange = async (value: string) => {
    if (authData) {
      setIsLoading(true);

      await dispatch(
        updateFeatureFlag({
          newFeatures: {
            isAppRedesigned: value === 'new' ? true : false,
          },

          userId: authData?.id,
        }),
      ).unwrap();

      setIsLoading(false);
      forceUpdate();
    }
  };

  return (
    <HStack gap="16">
      <Text text={t('variant-interfeisa')} />
      {isLoading ? (
        <Skeleton width={100} height={40} />
      ) : (
        <ListBox
          onChange={onChange}
          items={items}
          value={isAppRedesign ? 'new' : 'old'}
          className={className}
        />
      )}
    </HStack>
  );
});
