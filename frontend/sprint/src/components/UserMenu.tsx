import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import useBindStore from '@store/zustand';
import { Button, Space } from 'antd';
import { SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import UserAvatar from './UserAvatar';

interface UserMenuProps {
  setOpenUser: React.Dispatch<SetStateAction<boolean>>
}

const UserMenu: React.FC<UserMenuProps> = ({ setOpenUser }: UserMenuProps) => {
  const user = useBindStore(state => state.user);
  const logOut = useBindStore(state => state.logOut);
  const navigate = useNavigate();
  const onProfileClick = (): void => {
    navigate('/profile');
    setOpenUser(false);
  };
  const handleLogout = async (): Promise<void> => {
    try {
      await logOut();
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
    setOpenUser(false);
  };
  return (
    <div>
      <Space className="user-drop">
        {user !== null && <UserAvatar user={user} />}
        {user?.username}
      </Space>
      <Button className="drop-menu" onClick={onProfileClick}>
        <UserOutlined />
        Profile Page
      </Button>
      <Button className="drop-menu" onClick={() => { void handleLogout(); }}>
        <LogoutOutlined />
        Logout
      </Button>
    </div>
  );
};

export default UserMenu;
