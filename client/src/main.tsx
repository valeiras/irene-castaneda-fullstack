import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ToastContainer, Slide } from 'react-toastify';

import { GlobalContextProvider } from './context';
import ErrorPage from './components/ErrorPage';

import './index.css';
import 'react-toastify/dist/ReactToastify.css';

import {
  HomeLayout,
  Home,
  Teaching,
  Research,
  Opportunities,
  Contact,
  Login,
  AdminLayout,
  AdminHome,
  AdminPublications,
  AdminProjects,
  AdminTutoring,
} from './routes';

import { action as loginAction } from './routes/Login';

export const routes = [
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: 'teaching', element: <Teaching /> },
      { path: 'contact', element: <Contact /> },
      { path: 'research', element: <Research /> },
      { path: 'opportunities', element: <Opportunities /> },
    ],
  },
  {
    path: '/login',
    element: <Login />,
    errorElement: <ErrorPage />,
    action: loginAction,
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <AdminHome /> },
      { path: 'publications', element: <AdminPublications /> },
      { path: 'projects', element: <AdminProjects /> },
      { path: 'tutoring', element: <AdminTutoring /> },
    ],
  },
];

const router = createBrowserRouter(routes);

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <GlobalContextProvider>
      <ToastContainer position="top-center" transition={Slide} />
      <RouterProvider router={router} />
    </GlobalContextProvider>
  </React.StrictMode>
);
