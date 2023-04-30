import { useTranslation } from 'react-i18next';

import cls from './NotFoundPage.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';

interface NotFoundPageProps {
  className?: string;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = (props) => {
  const { className } = props;
  const { t } = useTranslation();

  return (
    <div
      data-testid={'NotFoundPage'}
      className={classNames(cls.notFoundPage, {}, [className as string])}
    >
      {t('Страница не найдена')}
    </div>
  );
};
