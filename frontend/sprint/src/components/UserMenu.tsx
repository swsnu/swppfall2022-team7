import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import useBindStore from '@store/zustand';
import { iconString } from '@utils/utils';
import { Avatar, Button, Space } from 'antd';
import { SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';

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
  };
  return (
    <div>
      <Space className="user-drop">
        <Avatar>{iconString(user?.username ?? '')}</Avatar>
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
