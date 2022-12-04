import { UserType } from '@store/zustand/user';
import { Avatar, List } from 'antd';

interface UserCardProps {
  user: Omit<UserType, 'id'>
}

const UserCard: React.FC<UserCardProps> = ({ user }: UserCardProps) => {
  return (
    <List.Item>
      <List.Item.Meta
        avatar={<Avatar>{user.username.substring(0, 1)}</Avatar>}
        title={user.username}
        description={user.email}
      />
    </List.Item>
  );
};

export default UserCard;
