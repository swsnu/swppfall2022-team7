import Layout from '@layouts/Layout';
import Home from '@pages/Home';
import { RouteObject } from 'react-router-dom';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> }
    ]
  }
];
