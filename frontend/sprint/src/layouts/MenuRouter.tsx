import AddTask from '@pages/AddTask';
import ProjectCalendar from '@pages/ProjectCalendar';
import ProjectContribution from '@pages/ProjectContribution';
import ProjectDocument from '@pages/ProjectDocument';
import TaskDetail from '@pages/TaskDetail';
import { useParams } from 'react-router-dom';

const MenuRouter: React.FC = () => {
  const { menuId, taskId } = useParams();
  if (menuId === 'add_task') {
    return <AddTask />;
  }
  if (menuId === 'docs') {
    return <ProjectDocument />;
  }
  if (menuId === 'contrib') {
    return <ProjectContribution />;
  }
  if (menuId === 'cal') {
    return <ProjectCalendar />;
  }
  if (taskId === undefined) {
    return (
      <div>{menuId}</div>
    );
  }
  return (
    <TaskDetail />
  );
};

export default MenuRouter;
