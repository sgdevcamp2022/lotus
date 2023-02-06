import React from 'react';
import { render } from 'react-dom';

import App from '@layouts/App';
import { BrowserRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';

render(
  <CookiesProvider>
    <App />
  </CookiesProvider>,
  document.querySelector('#app'),
);
