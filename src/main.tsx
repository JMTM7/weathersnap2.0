import App from './App';
import { BrowserRouter } from 'react-router-dom';
import LanguageProvider from '@context/LanguageProvider.js';
import { Provider } from 'react-redux';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import store from './state/index';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <LanguageProvider>
          <App />
        </LanguageProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
