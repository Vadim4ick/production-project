import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import {
  getAddCommentFormError,
  getAddCommentFormText,
} from '../../model/selectors/addCommentFormSelectors';
import {
  addCommentFormActions,
  addCommentFormReducer,
} from '../../model/slices/addCommentFormSlice';

import cls from './AddCommentForm.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
  DynamicModuleLoader,
  ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { ToggleFeatures } from '@/shared/lib/features';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
  Button as ButtonDeprecated,
  ThemeButton,
} from '@/shared/ui/deprecated/Button';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input';
import { Button } from '@/shared/ui/redesigned/Button';
import { Card } from '@/shared/ui/redesigned/Card';
import { Input } from '@/shared/ui/redesigned/Input';
import { HStack } from '@/shared/ui/redesigned/Stack';

export interface AddCommentFormProps {
  className?: string;
  onSendComment: (text: string) => void;
}

const reducers: ReducersList = {
  addCommentForm: addCommentFormReducer,
};

const AddCommentForm = memo((props: AddCommentFormProps) => {
  const { className, onSendComment } = props;
  const { t } = useTranslation('article');

  const text = useSelector(getAddCommentFormText);
  const error = useSelector(getAddCommentFormError);

  const dispatch = useAppDispatch();

  const onCommentTextChange = useCallback(
    (value: string) => {
      dispatch(addCommentFormActions.setText(value));
    },
    [dispatch],
  );

  const onSendHandler = useCallback(() => {
    onSendComment(text);
    onCommentTextChange('');
  }, [onCommentTextChange, onSendComment, text]);

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <ToggleFeatures
        feature="isAppRedesigned"
        off={
          <HStack
            data-testid="AddCommentForm"
            justify="between"
            max
            className={classNames(cls.addCommentForm, {}, [className])}
          >
            <InputDeprecated
              data-testid="AddCommentForm.Input"
              className={cls.input}
              placeholder={t('enter-the-text-of-the-comment')}
              value={text}
              onChange={onCommentTextChange}
            />

            <ButtonDeprecated
              data-testid="AddCommentForm.Button"
              onClick={onSendHandler}
              theme={ThemeButton.OUTLINE}
            >
              {t(`Send`)}
            </ButtonDeprecated>
          </HStack>
        }
        on={
          <Card padding="24" border="partial" max>
            <HStack
              data-testid="AddCommentForm"
              justify="between"
              max
              gap="16"
              className={classNames(cls.addCommentFormRedesign, {}, [
                className,
              ])}
            >
              <Input
                data-testid="AddCommentForm.Input"
                className={cls.input}
                placeholder={t('enter-the-text-of-the-comment')}
                value={text}
                onChange={onCommentTextChange}
              />

              <Button
                data-testid="AddCommentForm.Button"
                onClick={onSendHandler}
                variant="outline"
              >
                {t(`Send`)}
              </Button>
            </HStack>
          </Card>
        }
      />
    </DynamicModuleLoader>
  );
});

export default AddCommentForm;
