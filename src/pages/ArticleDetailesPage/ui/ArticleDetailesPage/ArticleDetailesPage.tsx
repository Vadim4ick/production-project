import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { ArticleDetails } from 'entities/Article';
import { classNames } from 'shared/lib/classNames/classNames';

import cls from './ArticleDetailesPage.module.scss';

interface ArticleDetailesPageProps {
  className?: string;
}

const ArticleDetailesPage: FC<ArticleDetailesPageProps> = (props) => {
  const { className } = props;
  const { t } = useTranslation('article');

  const { id } = useParams<{ id: string }>();

  if (!id) {
    return (
      <div className={classNames(cls.articleDetailesPage, {}, [className])}>
        {t('Статья не найдена')}
      </div>
    );
  }

  return (
    <div className={classNames(cls.articleDetailesPage, {}, [className])}>
      <ArticleDetails id={id} />
    </div>
  );
};

export default memo(ArticleDetailesPage);
