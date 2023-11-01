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
  AdminTutorings,
  AdminAuthors,
  AdminOpportunities,
} from './routes';

import { loader as researchLoader } from './routes/Research';
import { loader as teachingLoader } from './routes/Teaching';
import { loader as opportunitiesLoader } from './routes/Opportunities';

import { action as loginAction } from './routes/Login';
import { loader as adminLoader } from './routes/AdminLayout';
import {
  loader as adminPubsLoader,
  action as adminPubsAction,
} from './routes/AdminPublications';
import {
  loader as adminTutsLoader,
  action as adminTutsAction,
} from './routes/AdminTutorings';
import {
  loader as adminProjsLoader,
  action as adminProjsAction,
} from './routes/AdminProjects';
import {
  loader as adminOppsLoader,
  action as adminOppsAction,
} from './routes/AdminOpportunities';
import {
  loader as adminAutsLoader,
  action as adminAutsAction,
} from './routes/AdminAuthors';

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
      {
        path: 'teaching',
        element: <Teaching />,
        loader: teachingLoader(queryClient),
      },
      { path: 'contact', element: <Contact /> },
      {
        path: 'research',
        element: <Research />,
        loader: researchLoader(queryClient),
      },
      {
        path: 'opportunities',
        element: <Opportunities />,
        loader: opportunitiesLoader(queryClient),
      },
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
        loader: adminPubsLoader(queryClient),
        action: adminPubsAction(queryClient),
      },
      {
        path: 'authors',
        element: <AdminAuthors />,
        action: adminAutsAction(queryClient),
        loader: adminAutsLoader(queryClient),
      },
      {
        path: 'projects',
        element: <AdminProjects />,
        action: adminProjsAction(queryClient),
        loader: adminProjsLoader(queryClient),
      },
      {
        path: 'tutoring',
        element: <AdminTutorings />,
        action: adminTutsAction(queryClient),
        loader: adminTutsLoader(queryClient),
      },
      {
        path: 'opportunities',
        element: <AdminOpportunities />,
        action: adminOppsAction(queryClient),
        loader: adminOppsLoader(queryClient),
      },
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
