import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from 'shared/lib/classNames/classNames';
import { Page } from 'widgets/Page/Page';

import cls from './AdminPanelPage.module.scss';

interface AdminPanelPageProps {
  className?: string;
}

const AdminPanelPage = memo((props: AdminPanelPageProps) => {
  const { className } = props;
  const { t } = useTranslation('admin');

  return (
    <Page className={classNames(cls.adminPanelPage, {}, [className])}>
      {t('admin-panel')}
    </Page>
  );
});

export default AdminPanelPage;
