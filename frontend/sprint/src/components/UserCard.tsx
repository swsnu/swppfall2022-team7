import useBindStore from '@store/zustand';
import { UserType } from '@store/zustand/user';
import { List } from 'antd';
import UserAvatar from './UserAvatar';

interface UserCardProps {
  user: Omit<UserType, 'id'>
}

const UserCard: React.FC<UserCardProps> = ({ user }: UserCardProps) => {
  const getProfile = useBindStore(state => state.getProfile);
  const setShowProfileModal = useBindStore(state => state.setShowProfileModal);

  const titleClick = async (): Promise<void> => {
    await getProfile(user);
    await setShowProfileModal(true);
  };

  const clickable = (val: JSX.Element): JSX.Element => {
    return <div style={{ cursor: 'pointer' }} onClick={ () => { void titleClick(); } }>{val}</div>;
  };

  return (
    <List.Item>
      <List.Item.Meta
        avatar={clickable(<UserAvatar user={user} />)}
        title={clickable(<>{user.username}</>)}
        description={user.email}
      />
    </List.Item>
  );
};

export default UserCard;
