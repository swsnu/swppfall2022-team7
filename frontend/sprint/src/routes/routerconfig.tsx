import ProjectIntro from '@pages/ProjectIntro';
import Layout from '@layouts/Layout';
import Home from '@pages/Home';
import ProjectMain from '@layouts/ProjectMain';
import { RouteObject } from 'react-router-dom';
import TaskDetail from '@pages/TaskDetail';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      {
        path: '/projects/:projectId',
        element: <ProjectMain />,
        children: [
          { path: '/projects/:projectId', element: <ProjectIntro /> },
          { path: '/projects/:projectId/tasks/:taskId', element: <TaskDetail /> }
        ]
      }
    ]
  }
];
