import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import App from './App';
import store from './store';
import theme from './theme';
import './i18n/config'; // Initialize i18n
import './index.css';
import './responsive.css';
import 'leaflet/dist/leaflet.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);

// Register service worker in production for faster repeat visits (cached app shell)
if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register(`${process.env.PUBLIC_URL || ''}/service-worker.js`)
      .then((registration) => {
        // Optional: log when SW updates
        registration.onupdatefound = () => {
          const installing = registration.installing;
          if (installing) {
            installing.onstatechange = () => {
              if (installing.state === 'installed' && navigator.serviceWorker.controller) {
                // New content available; optionally show "Refresh to update" toast
              }
            };
          }
        };
      })
      .catch((err) => console.warn('Service worker registration failed:', err));
  });
}

