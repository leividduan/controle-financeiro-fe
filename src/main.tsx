import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

import './index.css';

import App from './routes/App';
import Login from './routes/Login';
import Register from './routes/Register';
import Accounts from './routes/Accounts';
import Categories from './routes/Categories';
import Transactions from './routes/Transactions';
import Home from './routes/Home';
import Modal from './components/Modal';
import AccountDelete from './routes/AccountDelete';
import AccountSave from './routes/AccountSave';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: 'accounts',
        element: <Accounts />,
        children: [
          {
            path: 'new',
            element: <AccountSave isEdit={false} />
          },
          {
            path: ':accountId/edit',
            element: <AccountSave isEdit={true} />
          },
          {
            path: ':accountId/delete',
            element: <AccountDelete />
          },
        ],
      },
      {
        path: 'categories',
        element: <Categories />
      },
      {
        path: 'transactions',
        element: <Transactions />
      },
    ],
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  }
]);


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
