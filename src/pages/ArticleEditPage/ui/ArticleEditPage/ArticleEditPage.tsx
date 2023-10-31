import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getAuthUserData } from '@/entities/User';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Page } from '@/widgets/Page';

interface ArticleEditPageProps {
  className?: string;
}

const ArticleEditPage = memo((props: ArticleEditPageProps) => {
  const { className } = props;
  const { t } = useTranslation('article');

  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);

  const userData = useSelector(getAuthUserData);

  if (userData?.id !== id) {
    return <div>Доступ запрещен</div>;
  }

  return (
    <Page className={classNames('', {}, [className])}>
      {isEdit
        ? t('editing-an-article-with-id') + id
        : t('sozdanie-novoi-stati')}
    </Page>
  );
});

export default ArticleEditPage;
