import AddTask from '@pages/AddTask';
import TaskDetail from '@pages/TaskDetail';
import { useParams } from 'react-router-dom';

const MenuRouter: React.FC = () => {
  const { menuId, taskId } = useParams();
  if (menuId === 'add_task') {
    return <AddTask />;
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
