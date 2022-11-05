import ProjectIntro from '@pages/ProjectIntro';
import Layout from '@layouts/Layout';
import Home from '@pages/Home';
import { RouteObject } from 'react-router-dom';
import ProjectMain from '@layouts/ProjectMain';
import NewProject from '@pages/NewProject';
import TaskDetail from '@pages/TaskDetail';

const taskContent: string = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/projects', element: <Home /> },
      {
        path: '/projects/:projectId',
        element: <ProjectMain />,
        children: [
          { path: '/projects/:projectId', element: <ProjectIntro /> },
          { path: '/projects/:projectId/tasks/1', element: <TaskDetail taskName={'Write First Draft'} taskContent={taskContent}/> },
          { path: '/projects/:projectId/tasks/2', element: <TaskDetail taskName={'Write Second Draft'} taskContent={taskContent}/> },
          { path: '/projects/:projectId/tasks/3', element: <TaskDetail taskName={'Write Final Draft'} taskContent={taskContent}/> }
        ]
      },
      { path: '/projects/new-project', element: <NewProject /> }
    ]
  }
];
