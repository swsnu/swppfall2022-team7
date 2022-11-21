import ProjectIntro from '@pages/ProjectIntro';
import Layout from '@layouts/Layout';
import Home from '@pages/Home';
import { RouteObject } from 'react-router-dom';
import ProjectMain from '@layouts/ProjectMain';
import NewProject from '@pages/NewProject';
import MenuRouter from '@layouts/MenuRouter';
import Login from '@pages/Login';
import SignUp from '@pages/SignUp';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/login', element: <Login /> },
      { path: '/signup', element: <SignUp /> },
      { path: '/projects', element: <Home /> },
      {
        path: '/projects/:projectId',
        element: <ProjectMain />,
        children: [
          { path: '/projects/:projectId', element: <ProjectIntro /> },
          { path: '/projects/:projectId/:menuId/:taskId', element: <MenuRouter /> },
          { path: '/projects/:projectId/:menuId', element: <MenuRouter /> }
        ]
      },
      { path: '/projects/new-project', element: <NewProject /> }
    ]
  }
];
