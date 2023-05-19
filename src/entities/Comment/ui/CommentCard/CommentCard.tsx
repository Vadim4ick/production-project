import { memo } from 'react';

import { Comment } from '../../model/types/comment';

import cls from './CommentCard.module.scss';
import { getRouteProfile } from '@/shared/const/router';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures, toggleFeatures } from '@/shared/lib/features';
import { AppLink as AppLinkDeprecated } from '@/shared/ui/deprecated/AppLink';
import { Avatar as AvatarDeprecated } from '@/shared/ui/deprecated/Avatar';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Card } from '@/shared/ui/redesigned/Card';
import { Skeleton as SkeletonRedesign } from '@/shared/ui/redesigned/Skeleton';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

interface CommentCardProps {
  className?: string;
  comment?: Comment;
  isLoading?: boolean;
}

export const CommentCard = memo((props: CommentCardProps) => {
  const { className, comment, isLoading } = props;

  const Skeleton = toggleFeatures({
    name: 'isAppRedesigned',
    off: () => SkeletonDeprecated,
    on: () => SkeletonRedesign,
  });

  if (isLoading) {
    return (
      <VStack
        data-testid="CommentCard.Loading"
        gap="8"
        max
        className={classNames(cls.commentCard, {}, [className, cls.loading])}
      >
        <div className={cls.header}>
          <Skeleton width={30} height={30} border={'50%'} />
          <Skeleton height={16} width={100} className={cls.username} />
        </div>
        <Skeleton width={'100%'} height={50} className={cls.text} />
      </VStack>
    );
  }

  if (!comment) {
    return null;
  }

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      off={
        <VStack
          data-testid="CommentCard.Content"
          max
          gap="8"
          className={classNames(cls.commentCard, {}, [className])}
        >
          <AppLinkDeprecated
            to={getRouteProfile(comment.user.id)}
            className={cls.header}
          >
            {comment.user.avatar ? (
              <AvatarDeprecated src={comment.user.avatar} size={30} />
            ) : null}
            <TextDeprecated
              className={cls.username}
              title={comment.user.username}
            />
          </AppLinkDeprecated>
          <TextDeprecated className={cls.text} text={comment.text} />
        </VStack>
      }
      on={
        <Card padding="24" border="round" max>
          <VStack
            data-testid="CommentCard.Content"
            max
            gap="8"
            className={classNames(cls.commentCardRedesign, {}, [className])}
          >
            <AppLink to={getRouteProfile(comment.user.id)}>
              <HStack gap="8">
                {comment.user.avatar ? (
                  <Avatar src={comment.user.avatar} size={30} />
                ) : null}

                <Text text={comment.user.username} bold />
              </HStack>
            </AppLink>
            <Text text={comment.text} />
          </VStack>
        </Card>
      }
    />
  );
});
