import { UserType } from '@store/zustand/user';
import { List } from 'antd';
import UserAvatar from './UserAvatar';

interface UserCardProps {
  user: Omit<UserType, 'id'>
}

const UserCard: React.FC<UserCardProps> = ({ user }: UserCardProps) => {
  return (
    <List.Item>
      <List.Item.Meta
        avatar={<UserAvatar user={user} />}
        title={user.username}
        description={user.email}
      />
    </List.Item>
  );
};

export default UserCard;
