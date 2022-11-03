import Layout from '@layouts/Layout';
import Home from '@pages/Home';
import ProjectMain from '@pages/ProjectMain';
import { RouteObject } from 'react-router-dom';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/project/:id', element: <ProjectMain /> }
    ]
  }
];
