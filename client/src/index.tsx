import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { ready } from './utils';
import App from './App';
import store from './store';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from '@/queryClient';

const doRender = () => {
  const root = createRoot(document.getElementById('root') as HTMLElement);

  root.render(
    <StrictMode>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <HashRouter>
            <App />
          </HashRouter>
        </QueryClientProvider>
      </Provider>
    </StrictMode>
  );
};

ready(doRender);
