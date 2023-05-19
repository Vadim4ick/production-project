import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, ThemeButton } from '../../deprecated/Button/Button';
import { Text } from '../../deprecated/Text/Text';
import { Icon } from '../Icon';
import { Modal } from '../Modal/Modal';

import cls from './Code.module.scss';
import IconCopyDeprecated from '@/shared/assets/icons/copy.svg';
import IconCopyRedesign from '@/shared/assets/icons/copyRedesign.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';

interface CodeProps {
  className?: string;
  text: string;
}

export const Code = memo((props: CodeProps) => {
  const { className, text } = props;
  const [openCopyModal, setOpenCopyModal] = useState(false);

  const { t } = useTranslation('article');

  const onCopy = useCallback(() => {
    navigator.clipboard.writeText(text);
    setOpenCopyModal((prev) => !prev);
  }, [text]);

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      off={
        <pre className={classNames(cls.code, {}, [className])}>
          <Button
            onClick={onCopy}
            className={cls.copyBtn}
            theme={ThemeButton.CLEAR}
          >
            <IconCopyDeprecated
              title={t('Копировать')}
              className={cls.copyIcon}
            />
          </Button>
          <code>{text}</code>
          <Modal isOpen={openCopyModal} onClose={() => setOpenCopyModal(false)}>
            <Text text={t('Успешно скопировано в буфер обмена!')} />
          </Modal>
        </pre>
      }
      on={
        <pre className={classNames(cls.codeRedesign, {}, [className])}>
          <Icon
            clickable
            onClick={onCopy}
            className={cls.copyBtn}
            Svg={IconCopyRedesign}
          />

          <code>{text}</code>

          <Modal isOpen={openCopyModal} onClose={() => setOpenCopyModal(false)}>
            <Text text={t('Успешно скопировано в буфер обмена!')} />
          </Modal>
        </pre>
      }
    />
  );
});
