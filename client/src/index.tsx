import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { ready } from './utils';
import App from './App';
import store from './store';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router';

const doRender = () => {
  const root = createRoot(document.getElementById('root'));

  root.render(
    <StrictMode>
      <Provider store={store}>
        <HashRouter>
          <App />
        </HashRouter>
      </Provider>
    </StrictMode>
  );
};

ready(doRender);
