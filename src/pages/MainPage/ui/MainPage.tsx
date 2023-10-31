import { useTranslation } from 'react-i18next';

import { Flex } from '@/shared/ui/redesigned/Stack/Flex/Flex';
import { Text } from '@/shared/ui/redesigned/Text';
import { Page } from '@/widgets/Page';

const MainPage = () => {
  const { t } = useTranslation('main');

  return (
    <Page data-testid={'MainPage'}>
      {t('Главная страница')}

      <Flex gap="32" direction="column">
        <Flex gap="16" direction="column">
          <h1>Прохождение авторизации:</h1>

          <Text bold text="Логин - admin. Пароль - 123 - администратор" />
          <Text bold text="Логин - user. Пароль - 123 - пользователь" />
          <Text bold text="Логин - manager. Пароль - 123 - менеджер" />
        </Flex>

        <Flex gap="16" direction="column">
          <Text
            size="l"
            bold
            text="Что б изменить дизайн систему на более лучшую, авторизуйтесь, перейдите в раздел 'настройки' и измените дизайн"
          />
        </Flex>
      </Flex>
    </Page>
  );
};

export default MainPage;
