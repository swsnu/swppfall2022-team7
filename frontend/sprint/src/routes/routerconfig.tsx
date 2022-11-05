import Layout from '@layouts/Layout';
import Home from '@pages/Home';
import NewProject from '@pages/NewProject';
import { RouteObject } from 'react-router-dom';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/projects', element: <Home /> },
      { path: '/projects/new-project', element: <NewProject /> }
    ]
  }
];
