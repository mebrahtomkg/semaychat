import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { ready } from './utils';
import App from './App';
import store from './store';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const doRender = () => {
  const root = createRoot(document.getElementById('root'));

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
