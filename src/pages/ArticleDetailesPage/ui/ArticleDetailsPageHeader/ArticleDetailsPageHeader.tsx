import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { getCanEditArticle } from '../../model/selectors/article';

import { getArticleDetailsData } from '@/entities/Article';
import { getRouteArticles, getRouteArticlesEdit } from '@/shared/const/router';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button, ThemeButton } from '@/shared/ui/deprecated/Button';
import { HStack } from '@/shared/ui/redesigned/Stack';

interface ArticleDetailsPageHeaderProps {
  className?: string;
}

export const ArticleDetailsPageHeader = memo(
  (props: ArticleDetailsPageHeaderProps) => {
    const { className } = props;
    const { t } = useTranslation('article');

    const navigate = useNavigate();

    const article = useSelector(getArticleDetailsData);
    const canEdit = useSelector(getCanEditArticle);

    const onEditArticle = useCallback(() => {
      if (article) {
        navigate(getRouteArticlesEdit(article.id));
      }
    }, [article, navigate]);

    const onBackToList = useCallback(() => {
      navigate(getRouteArticles());
    }, [navigate]);

    return (
      <HStack max justify="between" className={classNames('', {}, [className])}>
        <Button theme={ThemeButton.OUTLINE} onClick={onBackToList}>
          {t('Back to the list')}
        </Button>

        {canEdit && (
          <Button
            className={''}
            theme={ThemeButton.OUTLINE}
            onClick={onEditArticle}
          >
            {t('edit')}
          </Button>
        )}
      </HStack>
    );
  },
);
