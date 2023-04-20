import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/classNames/classNames';
import { VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text/Text';

import { Comment } from '../../model/types/comment';
import { CommentCard } from '../CommentCard/CommentCard';

interface CommentListProps {
  className?: string;
  commets?: Comment[];
  isLoading?: boolean;
}

export const CommentList = memo((props: CommentListProps) => {
  const { className, isLoading, commets } = props;

  const { t } = useTranslation();

  if (isLoading) {
    return (
      <VStack gap="16" max className={classNames('', {}, [className])}>
        <CommentCard isLoading />
        <CommentCard isLoading />
        <CommentCard isLoading />
      </VStack>
    );
  }

  return (
    <VStack max gap="16" className={classNames('', {}, [className])}>
      {commets?.length ? (
        commets.map((comment, i) => (
          <CommentCard key={i} comment={comment} isLoading={isLoading} />
        ))
      ) : (
        <Text text={t('There is no comment')} />
      )}
    </VStack>
  );
});
