import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './app/App';
import { ThemeProvider } from 'app/providers/ThemeProvider';
import 'app/styles/index.scss';

import 'shared/config/i18n/i18n';
import { ErrorBounderay } from 'app/providers/ErrorBounderay';
import { StoreProvider } from 'app/providers/StoreProvider';

render(
  <BrowserRouter>
    <StoreProvider>
      <ErrorBounderay>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </ErrorBounderay>
    </StoreProvider>
  </BrowserRouter>,

  document.getElementById('root'),
);
