import { Tag } from 'antd';

interface StatusTagProps {
  status: 'on-going' | 'done'
}

const StatusTag: React.FC<StatusTagProps> = ({ status }: StatusTagProps) => {
  return (
    <div>
      <Tag className="status-tag" color={status === 'on-going' ? 'volcano' : 'geekblue'}>
        {status === 'on-going' ? 'On Going' : 'Done'}
      </Tag>
    </div>
  );
};

export default StatusTag;
