import ProjectIntro from '@pages/ProjectIntro';
import Layout from '@layouts/Layout';
import Home from '@pages/Home';
import { Navigate, RouteObject } from 'react-router-dom';
import ProjectMain from '@layouts/ProjectMain';
import NewProject from '@pages/NewProject';
import MenuRouter from '@layouts/MenuRouter';
import Login from '@pages/Login';
import SignUp from '@pages/SignUp';
import PrivateRoute from '@layouts/PrivateRoute';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/projects" />
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/login', element: <Login /> },
      { path: '/signup', element: <SignUp /> },
      {
        path: '/projects',
        element: <PrivateRoute />,
        children: [
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
    ]
  }
];
