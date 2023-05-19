import { memo } from 'react';

import { ArticleView } from '../../model/consts/articleConsts';

import cls from './ArticleListItem.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures, toggleFeatures } from '@/shared/lib/features';
import { Card as CardDeprecated } from '@/shared/ui/deprecated/Card';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { Card as CardRedesigned } from '@/shared/ui/redesigned/Card';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';

interface ArticleListItemSkeletonProps {
  className?: string;
  view: ArticleView;
}

export const ArticleListItemSkeleton = memo(
  (props: ArticleListItemSkeletonProps) => {
    const { className, view } = props;

    const mainClass = toggleFeatures({
      name: 'isAppRedesigned',
      off: () => cls.ArticleListItem,
      on: () => cls.ArticleListItemRedesigned,
    });

    const Skeleton = toggleFeatures({
      name: 'isAppRedesigned',
      off: () => SkeletonDeprecated,
      on: () => SkeletonRedesigned,
    });

    const Card = toggleFeatures({
      name: 'isAppRedesigned',
      off: () => CardDeprecated,
      on: () => CardRedesigned,
    });

    // if (view === ArticleView.BIG) {
    //   return (
    //     <div className={classNames(mainClass, {}, [className, cls[view]])}>
    //       <Card className={cls.card}>
    //         <div className={cls.header}>
    //           <Skeleton border="50%" height={30} width={30} />
    //           <Skeleton width={150} height={16} className={cls.username} />
    //           <Skeleton width={150} height={16} className={cls.date} />
    //         </div>
    //         <Skeleton width={250} height={24} className={cls.title} />
    //         <Skeleton height={200} className={cls.img} />
    //         <div className={cls.footer}>
    //           <Skeleton height={36} width={200} />
    //         </div>
    //       </Card>
    //     </div>
    //   );
    // }

    if (view === ArticleView.BIG) {
      return (
        <ToggleFeatures
          feature="isAppRedesigned"
          off={
            <div className={classNames(mainClass, {}, [className, cls[view]])}>
              <Card className={cls.card}>
                <div className={cls.header}>
                  <Skeleton border="50%" height={30} width={30} />
                  <Skeleton width={150} height={16} className={cls.username} />
                  <Skeleton width={150} height={16} className={cls.date} />
                </div>
                <Skeleton width={250} height={24} className={cls.title} />
                <Skeleton height={200} className={cls.img} />
                <div className={cls.footer}>
                  <Skeleton height={36} width={200} />
                </div>
              </Card>
            </div>
          }
          on={
            <div className={classNames(mainClass, {}, [className, cls[view]])}>
              <Card
                padding="24"
                max
                data-testid="ArticleListItem"
                className={cls.card}
              >
                <VStack gap="16" max>
                  <HStack gap="8" max>
                    <Skeleton border="50%" height={32} width={32} />
                    <Skeleton width={130} height={24} />
                  </HStack>

                  <Skeleton width={125} height={24} />
                  <Skeleton width={250} height={24} />

                  <Skeleton height={275} />

                  <Skeleton height={70} />

                  <HStack max justify="between">
                    <Skeleton width={150} height={42} />
                    <Skeleton width={75} height={32} />
                  </HStack>
                </VStack>
              </Card>
            </div>
          }
        />
      );
    }

    return (
      <ToggleFeatures
        feature="isAppRedesigned"
        off={
          <div className={classNames(mainClass, {}, [className, cls[view]])}>
            <Card className={cls.card}>
              <div className={cls.imageWrapper}>
                <Skeleton width={200} height={200} className={cls.img} />
              </div>
              <div className={cls.infoWrapper}>
                <Skeleton width={130} height={16} />
              </div>
              <Skeleton width={150} height={16} className={cls.title} />
            </Card>
          </div>
        }
        on={
          <div className={classNames(mainClass, {}, [className, cls[view]])}>
            <Card border="round" className={cls.card}>
              <Skeleton width={'100%'} height={140} />

              <VStack gap="16" className={cls.footer} justify="between">
                <Skeleton width={118} height={25} />

                <VStack gap="4" align="none" max>
                  <HStack justify="between">
                    <Skeleton width={85} height={20} />
                    <Skeleton width={88} height={30} />
                  </HStack>
                </VStack>
              </VStack>
              <HStack gap="4" className={cls.avatar}>
                <Skeleton border="100%" width={32} height={32} />
                <Skeleton width={47} height={24} />
              </HStack>
            </Card>
          </div>
        }
      />
    );
  },
);
