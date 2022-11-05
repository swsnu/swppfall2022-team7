import { SnippetsOutlined } from '@ant-design/icons';

interface TaskCardProps {
  name: string
  assignee: string
}

const TaskCard: React.FC<TaskCardProps> = ({ name, assignee }: TaskCardProps) => {
  return (
    <div className="task-card-container">
      <SnippetsOutlined style={{ fontSize: '400%' }} className="task-card-icon"/>
      <div className="task-card-info">
        <div className="task-name">{name}</div>
        <div className="task-assginee">{assignee}</div>
      </div>

    </div>
  );
};

export default TaskCard;
