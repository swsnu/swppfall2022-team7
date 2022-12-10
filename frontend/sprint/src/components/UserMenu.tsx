import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import useBindStore from '@store/zustand';
import { iconString } from '@utils/utils';
import { Avatar, Button, Space } from 'antd';
import { useNavigate } from 'react-router-dom';

const UserMenu: React.FC = () => {
  const user = useBindStore(state => state.user);
  const logOut = useBindStore(state => state.logOut);
  const navigate = useNavigate();
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
      <Button className="drop-menu" onClick={() => navigate('/profile')}>
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
