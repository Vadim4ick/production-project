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
import { Text } from 'shared/ui/Text/Text';

import cls from './PageProfileHeader.module.scss';

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
    <div className={classNames(cls.pageProfileHeader, {}, [className])}>
      <Text title={t('Профиль')} />

      {canEdit && (
        <div className={cls.btnWrapper}>
          {readonly ? (
            <Button
              className={cls.editBtn}
              theme={ThemeButton.OUTLINE}
              onClick={onEdit}
            >
              {t('Редактировать')}
            </Button>
          ) : (
            <>
              <Button
                className={cls.editBtn}
                theme={ThemeButton.OUTLINE_RED}
                onClick={onCancelEdit}
              >
                {t('Отменить')}
              </Button>

              <Button
                className={cls.saveBtn}
                theme={ThemeButton.OUTLINE}
                onClick={onSave}
              >
                {t('Сохранить')}
              </Button>
            </>
          )}
        </div>
      )}
    </div>
  );
};
