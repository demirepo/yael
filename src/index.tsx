import {BrowserRouter} from 'react-router-dom';
import React from 'react';
import {createRoot} from 'react-dom/client';
import {Provider} from 'react-redux';

import App from './App';
import './firebase';
import './index.css';
import {store} from './store/store';

const container = document.getElementById('root');
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
