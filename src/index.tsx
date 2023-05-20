import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './app/App';
import { ForceUpdateProvider } from './shared/lib/render/forceUpdate';
import { ErrorBounderay } from '@/app/providers/ErrorBounderay';
import { StoreProvider } from '@/app/providers/StoreProvider';
import { ThemeProvider } from '@/app/providers/ThemeProvider';
import '@/app/styles/index.scss';
import '@/shared/config/i18n/i18n';

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
        <ForceUpdateProvider>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </ForceUpdateProvider>
      </ErrorBounderay>
    </StoreProvider>
  </BrowserRouter>,
);
