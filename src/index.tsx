import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { ErrorBounderay } from '@/app/providers/ErrorBounderay';
import { StoreProvider } from '@/app/providers/StoreProvider';
import { ThemeProvider } from '@/app/providers/ThemeProvider';
import '@/app/styles/index.scss';
import '@/shared/config/i18n/i18n';

import App from './app/App';

const container = document.getElementById('root');

if (!container) {
  throw new Error(
    'Контейнер root не найден. НЕ удалось вмонтировать реакт приложение',
  );
}

const root = createRoot(container);

root.render(
  <BrowserRouter>
    <StoreProvider>
      <ErrorBounderay>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </ErrorBounderay>
    </StoreProvider>
  </BrowserRouter>,
);
