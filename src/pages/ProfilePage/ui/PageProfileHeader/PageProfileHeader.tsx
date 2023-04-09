import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import {
  getProfileData,
  getProfileReadonly,
  profileActions,
  updateProfileData,
} from 'entities/Profile';
import { getAuthUserData } from 'entities/User';
import { classNames } from 'shared/lib/classNames/classNames';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { HStack } from 'shared/ui/Stack/HStack/HStack';
import { Text } from 'shared/ui/Text/Text';

interface PageProfileHeaderProps {
  className?: string;
}

export const PageProfileHeader: React.FC<PageProfileHeaderProps> = (props) => {
  const { className } = props;

  const { t } = useTranslation();

  const authData = useSelector(getAuthUserData);
  const profileData = useSelector(getProfileData);
  const readonly = useSelector(getProfileReadonly);

  const dispatch = useAppDispatch();

  const canEdit = authData?.id === profileData?.id;

  const onEdit = useCallback(() => {
    dispatch(profileActions.setReadonly(false));
  }, [dispatch]);

  const onCancelEdit = useCallback(() => {
    dispatch(profileActions.cancelEdit());
  }, [dispatch]);

  const onSave = useCallback(() => {
    dispatch(updateProfileData());
  }, [dispatch]);

  return (
    <HStack max justify="between" className={classNames('', {}, [className])}>
      <Text title={t('Профиль')} />

      {canEdit && (
        <>
          {readonly ? (
            <Button theme={ThemeButton.OUTLINE} onClick={onEdit}>
              {t('Редактировать')}
            </Button>
          ) : (
            <HStack gap="8">
              <Button theme={ThemeButton.OUTLINE_RED} onClick={onCancelEdit}>
                {t('Отменить')}
              </Button>

              <Button theme={ThemeButton.OUTLINE} onClick={onSave}>
                {t('Сохранить')}
              </Button>
            </HStack>
          )}
        </>
      )}
    </HStack>
  );
};
