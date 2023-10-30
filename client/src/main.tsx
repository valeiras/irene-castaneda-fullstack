import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import { ToastContainer, Slide } from 'react-toastify';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

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
  AdminPublications,
  AdminProjects,
  AdminTutoring,
  AdminAuthors,
} from './routes';

import { action as loginAction } from './routes/Login';
import { loader as adminLoader } from './routes/AdminLayout';
import { loader as researchLoader } from './routes/Research';
import {
  loader as publicationsLoader,
  action as publicationsAction,
} from './routes/AdminPublications';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

export const routes = [
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: 'teaching', element: <Teaching /> },
      { path: 'contact', element: <Contact /> },
      {
        path: 'research',
        element: <Research />,
        loader: researchLoader(queryClient),
      },
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
    loader: adminLoader,
    children: [
      { index: true, element: <Navigate to="publications" /> },
      {
        path: 'publications',
        element: <AdminPublications />,
        loader: publicationsLoader(queryClient),
        action: publicationsAction(queryClient),
      },
      {
        path: 'authors',
        element: <AdminAuthors />,
      },
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
    <QueryClientProvider client={queryClient}>
      <GlobalContextProvider>
        <ToastContainer position="top-center" transition={Slide} />
        <RouterProvider router={router} />
      </GlobalContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
