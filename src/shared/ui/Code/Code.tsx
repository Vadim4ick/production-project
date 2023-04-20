import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import IconCopy from '@/shared/assets/icons/copy.svg';
import { classNames } from '@/shared/lib/classNames/classNames';

import { Button, ThemeButton } from '../Button/Button';
import { Modal } from '../Modal/Modal';
import { Text } from '../Text/Text';

import cls from './Code.module.scss';

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
