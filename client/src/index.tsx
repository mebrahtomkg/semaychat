'use strict';

import { createRoot } from 'react-dom/client';
import React, { StrictMode } from 'react';
import { ready } from './utils';
import App from './App';
import store from './store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router';

const doRender = () => {
	const root = createRoot(document.getElementById('root'));

	root.render(
    <StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </StrictMode>
  );
};

ready(doRender);
