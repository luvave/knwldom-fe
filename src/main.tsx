import ReactDOM from 'react-dom/client';
import React from 'react';
import App from './App';
import { CenteredLoading } from './components/common/CenteredLoading';

import './i18n/config';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <React.Suspense fallback={<CenteredLoading />}>
      <App />
    </React.Suspense>
  </React.StrictMode>,
);
