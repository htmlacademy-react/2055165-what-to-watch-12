import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/app/app';
import { store } from './store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HistoryRouter from './components/history-router/history-router';
import browserHistory from './browser-history';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(

  <Provider store={store}>
    <HistoryRouter history={browserHistory}>
      <ToastContainer />
      <App />
    </HistoryRouter>
  </Provider>

);
