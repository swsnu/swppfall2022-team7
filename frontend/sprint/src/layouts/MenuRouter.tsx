import TaskDetail from '@pages/TaskDetail';
import { useParams } from 'react-router-dom';

const MenuRouter: React.FC = () => {
  const { menuId, taskId } = useParams();
  console.log(menuId, taskId);
  if (taskId === undefined) {
    return (
      <div>{menuId}</div>
    );
  }
  return (
    <TaskDetail taskName="Task 1" taskContent="Yohoho" />
  );
};

export default MenuRouter;
