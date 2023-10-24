import React from 'react';
import ReactDOM from 'react-dom/client';

import ErrorPage from './components/ErrorPage';

import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { GlobalContextProvider } from './context';

import {
  Root,
  Home,
  Teaching,
  Research,
  Opportunities,
  Contact,
} from './routes';

export const routes = [
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: 'teaching', element: <Teaching /> },
      { path: 'contact', element: <Contact /> },
      { path: 'research', element: <Research /> },
      { path: 'opportunities', element: <Opportunities /> },
    ],
  },
];

const router = createBrowserRouter(routes);

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <GlobalContextProvider>
      <RouterProvider router={router} />
    </GlobalContextProvider>
  </React.StrictMode>
);
