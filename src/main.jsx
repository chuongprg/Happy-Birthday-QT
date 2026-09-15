import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

const isAdmin = import.meta.env.VITE_APP_TARGET === 'admin';

const Root = isAdmin
  ? React.lazy(() => import('./admin/AdminApp.jsx'))
  : React.lazy(() => import('./App.jsx'));

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <React.Suspense fallback={null}>
      <Root />
    </React.Suspense>
  </React.StrictMode>
);
