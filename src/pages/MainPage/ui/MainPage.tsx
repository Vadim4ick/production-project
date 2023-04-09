import { useTranslation } from 'react-i18next';

import { Select } from 'shared/ui/Select/Select';
import { HStack } from 'shared/ui/Stack';
import { Page } from 'widgets/Page/Page';

const MainPage = () => {
  const { t } = useTranslation('main');

  return (
    <Page>
      {t('Главная страница')}
      <HStack>
        <Select
          value={undefined}
          options={[
            { value: '1', content: '1' },
            { value: '2', content: '2' },
            { value: '3', content: '3' },
          ]}
        />
      </HStack>
    </Page>
  );
};

export default MainPage;
