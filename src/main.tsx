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
import Accounts, { loader as accountsLoader } from './routes/Accounts';
import Categories, { loader as categoriesLoader }  from './routes/Categories';
import Transactions, { loader as transactionsLoader } from './routes/Transactions';
import Home from './routes/Home';
import AccountDelete, { action as accountDeleteAction } from './routes/AccountDelete';
import AccountSave, { action as accountAction, loader as accountLoader } from './routes/AccountSave';
import CategorySave, { action as categoryAction, loader as categoryLoader } from './routes/CategorySave';
import CategoryDelete, { action as categoryDeleteAction }  from './routes/CategoryDelete';
import TransactionSave, { action as transactionAction, loader as transactionLoader } from './routes/TransactionSave';
import TransactionDelete, { action as transactionDeleteAction } from './routes/TransactionDelete';
import WorkingProgress from './routes/WorkingProgress';

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
        path: '/goals',
        element: <WorkingProgress />
      },
      {
        path: '/report',
        element: <WorkingProgress />
      },
      {
        path: '/',
        element: <Home />
      },
      {
        path: 'accounts',
        element: <Accounts />,
        loader: accountsLoader,
        children: [
          {
            path: 'new',
            action: accountAction,
            element: <AccountSave isEdit={false} />
          },
          {
            path: ':accountId/edit',
            action: accountAction,
            loader: accountLoader,
            element: <AccountSave isEdit={true} />
          },
          {
            path: ':accountId/delete',
            action: accountDeleteAction,
            loader: accountLoader,
            element: <AccountDelete />
          },
        ],
      },
      {
        path: 'categories',
        element: <Categories />,
        loader: categoriesLoader,
        children: [
          {
            path: 'new',
            action: categoryAction,
            loader: categoryLoader,
            element: <CategorySave isEdit={false} />
          },
          {
            path: ':categoryId/edit',
            action: categoryAction,
            loader: categoryLoader,
            element: <CategorySave isEdit={true} />
          },
          {
            path: ':categoryId/delete',
            action: categoryDeleteAction,
            loader: categoryLoader,
            element: <CategoryDelete />
          },
        ],
      },
      {
        path: 'transactions',
        element: <Transactions />,
        loader: transactionsLoader,
        children: [
          {
            path: 'new',
            action: transactionAction,
            loader: transactionLoader,
            element: <TransactionSave isEdit={false} />
          },
          {
            path: ':transactionId/edit',
            action: transactionAction,
            loader: transactionLoader,
            element: <TransactionSave isEdit={true} />
          },
          {
            path: ':transactionId/delete',
            action: transactionDeleteAction,
            loader: transactionLoader,
            element: <TransactionDelete />
          },
        ],
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
