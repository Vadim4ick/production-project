import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Modal } from '../../redesigned/Modal/Modal';
import { Button, ThemeButton } from '../Button/Button';
import { Text } from '../Text/Text';

import cls from './Code.module.scss';
import IconCopy from '@/shared/assets/icons/copy.svg';
import { classNames } from '@/shared/lib/classNames/classNames';

interface CodeProps {
  className?: string;
  text: string;
}

/**
 * Устарел, используем новые компоненты из папки redesigned
 * @deprecated
 */
export const Code = memo((props: CodeProps) => {
  const { className, text } = props;
  const [openCopyModal, setOpenCopyModal] = useState(false);

  const { t } = useTranslation('article');

  const onCopy = useCallback(() => {
    navigator.clipboard.writeText(text);
    setOpenCopyModal((prev) => !prev);
  }, [text]);

  return (
    <pre className={classNames(cls.code, {}, [className])}>
      <Button
        onClick={onCopy}
        className={cls.copyBtn}
        theme={ThemeButton.CLEAR}
      >
        <IconCopy title={t('Копировать')} className={cls.copyIcon} />
      </Button>
      <code>{text}</code>
      <Modal isOpen={openCopyModal} onClose={() => setOpenCopyModal(false)}>
        <Text text={t('Успешно скопировано в буфер обмена!')} />
      </Modal>
      ;
    </pre>
  );
});
