import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { getProfileData } from '../../model/selectors/getProfileData/getProfileData';
import { getProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly';
import { updateProfileData } from '../../model/services/updateProfileData/updateProfileData';
import { profileActions } from '../../model/slice/profileSlice';

import { getAuthUserData } from '@/entities/User';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
  Button as ButtonDeplecated,
  ThemeButton,
} from '@/shared/ui/deprecated/Button';
import { Text as TextDeplecated } from '@/shared/ui/deprecated/Text';
import { Button } from '@/shared/ui/redesigned/Button';
import { Card } from '@/shared/ui/redesigned/Card';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

interface EditableProfileCardHeaderProps {
  className?: string;
}

export const EditableProfileCardHeader = memo(
  (props: EditableProfileCardHeaderProps) => {
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
      <ToggleFeatures
        feature="isAppRedesigned"
        off={
          <HStack
            max
            justify="between"
            className={classNames('', {}, [className])}
          >
            <TextDeplecated title={t('Профиль')} />

            {canEdit && (
              <>
                {readonly ? (
                  <ButtonDeplecated
                    data-testid={'EditableProfileCardHeader.EditButton'}
                    theme={ThemeButton.OUTLINE}
                    onClick={onEdit}
                  >
                    {t('Редактировать')}
                  </ButtonDeplecated>
                ) : (
                  <HStack gap="8">
                    <ButtonDeplecated
                      data-testid={'EditableProfileCardHeader.CancelButton'}
                      theme={ThemeButton.OUTLINE_RED}
                      onClick={onCancelEdit}
                    >
                      {t('Отменить')}
                    </ButtonDeplecated>

                    <ButtonDeplecated
                      data-testid={'EditableProfileCardHeader.SaveButton'}
                      theme={ThemeButton.OUTLINE}
                      onClick={onSave}
                    >
                      {t('Сохранить')}
                    </ButtonDeplecated>
                  </HStack>
                )}
              </>
            )}
          </HStack>
        }
        on={
          <Card border="partial" padding="24" max>
            <HStack
              max
              justify="between"
              className={classNames('', {}, [className])}
            >
              <Text title={t('Профиль')} />

              {canEdit && (
                <>
                  {readonly ? (
                    <Button
                      data-testid={'EditableProfileCardHeader.EditButton'}
                      variant="outline"
                      onClick={onEdit}
                    >
                      {t('Редактировать')}
                    </Button>
                  ) : (
                    <HStack gap="8">
                      <Button
                        data-testid={'EditableProfileCardHeader.CancelButton'}
                        onClick={onCancelEdit}
                        color="error"
                      >
                        {t('Отменить')}
                      </Button>

                      <Button
                        data-testid={'EditableProfileCardHeader.SaveButton'}
                        variant="outline"
                        color="success"
                        onClick={onSave}
                      >
                        {t('Сохранить')}
                      </Button>
                    </HStack>
                  )}
                </>
              )}
            </HStack>
          </Card>
        }
      />
    );
  },
);
