import useBindStore from '@store/zustand';
import { Tag } from 'antd';
import { useParams } from 'react-router-dom';

interface StatusTagProps {
  status: 'on-going' | 'done'
}

const StatusTag: React.FC<StatusTagProps> = ({ status }: StatusTagProps) => {
  const toggleStatus = useBindStore(state => state.toggleStatus);
  const selectTask = useBindStore(state => state.selectTask);
  const { taskId } = useParams();
  const onToggleStatus = async (isDone: boolean): Promise<void> => {
    if (taskId === undefined) return;
    await toggleStatus(parseInt(taskId), isDone);
    await selectTask(parseInt(taskId));
  };
  return (
    <div>
      <Tag
        className="status-tag"
        color={status === 'on-going' ? 'volcano' : 'geekblue'}
        onClick={() => { void onToggleStatus(status === 'on-going'); }}
      >
        {status === 'on-going' ? 'On Going' : 'Done'}
      </Tag>
    </div>
  );
};

export default StatusTag;
