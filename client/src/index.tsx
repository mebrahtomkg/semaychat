import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { ready, registerServiceWorker } from './utils';
import App from './App';
import { HashRouter } from 'react-router';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from './queryClient';

const doRender = () => {
  const root = createRoot(document.getElementById('root') as HTMLElement);

  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <HashRouter>
          <App />
        </HashRouter>
      </QueryClientProvider>
    </StrictMode>,
  );
};

ready(() => {
  doRender();
  registerServiceWorker();
});
