import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { classNames } from '@/shared/lib/classNames/classNames';
import { Page } from '@/widgets/Page/Page';

interface ArticleEditPageProps {
  className?: string;
}

const ArticleEditPage = memo((props: ArticleEditPageProps) => {
  const { className } = props;
  const { t } = useTranslation('article');

  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);

  return (
    <Page className={classNames('', {}, [className])}>
      {isEdit
        ? t('editing-an-article-with-id') + id
        : t('sozdanie-novoi-stati')}
    </Page>
  );
});

export default ArticleEditPage;
