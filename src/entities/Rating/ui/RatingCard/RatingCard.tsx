import { memo, useCallback, useState } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import { useTranslation } from 'react-i18next';

import { ToggleFeatures } from '@/shared/lib/features';
import {
  Button as ButtonDeprecated,
  ButtonSize,
  ThemeButton,
} from '@/shared/ui/deprecated/Button';
import { Card as CardDeprecated } from '@/shared/ui/deprecated/Card';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input';
import { StarRating } from '@/shared/ui/deprecated/StarRating';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { Button } from '@/shared/ui/redesigned/Button';
import { Card } from '@/shared/ui/redesigned/Card';
import { Drawer } from '@/shared/ui/redesigned/Drawer';
import { Input } from '@/shared/ui/redesigned/Input';
import { Modal } from '@/shared/ui/redesigned/Modal';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

interface RatingCardProps {
  className?: string;
  title?: string;
  feedbackTitle?: string;
  hasFeedback?: boolean;
  onCancel?: (starsCount: number) => void;
  onAccent?: (starsCount: number, feedback?: string) => void;
  rate?: number;
}

export const RatingCard = memo((props: RatingCardProps) => {
  const {
    className,
    title,
    feedbackTitle,
    hasFeedback,
    onCancel,
    onAccent,
    rate,
  } = props;
  const { t } = useTranslation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [starsCount, setStarsCount] = useState(rate || 0);
  const [feedback, setFeedback] = useState('');

  const onSelectStars = useCallback(
    (selectedStartsCount: number) => {
      setStarsCount(selectedStartsCount);

      if (hasFeedback) {
        setIsModalOpen(true);
      } else {
        onAccent?.(selectedStartsCount);
      }
    },
    [hasFeedback, onAccent],
  );

  const acceptHandle = useCallback(() => {
    setIsModalOpen(false);
    onAccent?.(starsCount, feedback);
  }, [feedback, onAccent, starsCount]);

  const cancelHandle = useCallback(() => {
    setIsModalOpen(false);
    onCancel?.(starsCount);
  }, [onCancel, starsCount]);

  const modalContent = (
    <ToggleFeatures
      feature="isAppRedesigned"
      off={
        <>
          <TextDeprecated title={feedbackTitle} />
          <InputDeprecated
            data-testid="RatingCard.Input"
            value={feedback}
            onChange={setFeedback}
            placeholder={t('Your feedback')}
          />
        </>
      }
      on={
        <>
          <Text title={feedbackTitle} />
          <Input
            data-testid="RatingCard.Input"
            value={feedback}
            onChange={setFeedback}
            placeholder={t('Your feedback')}
          />
        </>
      }
    />
  );

  const content = (
    <>
      <VStack align="center" gap="8" max>
        <ToggleFeatures
          feature="isAppRedesigned"
          off={
            <TextDeprecated
              title={starsCount ? t('Thanks for the feedback') : title}
            />
          }
          on={
            <Text title={starsCount ? t('Thanks for the feedback') : title} />
          }
        />

        <StarRating
          selectedStars={starsCount}
          size={40}
          onSelect={onSelectStars}
        />
      </VStack>

      <BrowserView>
        <Modal isOpen={isModalOpen} lazy>
          <VStack max gap="32">
            {modalContent}

            <ToggleFeatures
              feature="isAppRedesigned"
              off={
                <HStack max gap="16" justify={'end'}>
                  <ButtonDeprecated
                    data-testid="RatingCard.Close"
                    onClick={cancelHandle}
                    theme={ThemeButton.OUTLINE_RED}
                  >
                    {t('Close')}
                  </ButtonDeprecated>

                  <ButtonDeprecated
                    data-testid="RatingCard.Send"
                    onClick={acceptHandle}
                  >
                    {t('Send')}
                  </ButtonDeprecated>
                </HStack>
              }
              on={
                <HStack max gap="16" justify={'end'}>
                  <Button data-testid="RatingCard.Close" onClick={cancelHandle}>
                    {t('Close')}
                  </Button>

                  <Button data-testid="RatingCard.Send" onClick={acceptHandle}>
                    {t('Send')}
                  </Button>
                </HStack>
              }
            />
          </VStack>
        </Modal>
      </BrowserView>

      <MobileView>
        <Drawer isOpen={isModalOpen} lazy onClose={cancelHandle}>
          <VStack gap="32">
            {modalContent}

            <ToggleFeatures
              feature="isAppRedesigned"
              off={
                <ButtonDeprecated
                  fullWidth
                  size={ButtonSize.L}
                  onClick={acceptHandle}
                >
                  {t('Send')}
                </ButtonDeprecated>
              }
              on={
                <Button fullWidth size={'l'} onClick={acceptHandle}>
                  {t('Send')}
                </Button>
              }
            />
          </VStack>
        </Drawer>
      </MobileView>
    </>
  );

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      off={
        <CardDeprecated className={className} max data-testid="RatingCard">
          {content}
        </CardDeprecated>
      }
      on={
        <Card
          padding="24"
          max
          border="round"
          className={className}
          data-testid="RatingCard"
        >
          {content}
        </Card>
      }
    />
  );
});
