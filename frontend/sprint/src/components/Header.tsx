import { Layout, Avatar, Badge, Popover, Button } from 'antd';
import { BellFilled, UserOutlined, FireFilled } from '@ant-design/icons';
import Notification from './Notification';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useBindStore from '@store/zustand';

const { Header: AntdHeader } = Layout;

const Header: React.FC = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const logOut = useBindStore(state => state.logOut);
  const handleLogout = async (): Promise<void> => {
    try {
      await logOut();
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  };
  const [showNotification, setShowNotification] = useState(false);
  return (
    <AntdHeader className="header">
      <div className="header-logo" onClick={() => navigate('/projects')}>
        <FireFilled className="logo-icon" />
        Sprint
      </div>
      {
      token !== null
        ? <>
        <div className="header-user-menu">
          <Popover trigger="click" content={<Notification />} autoAdjustOverflow={false} placement="bottomRight">
            <Button className="bell-button">
              <BellFilled className="bell-icon" onClick={() => setShowNotification(show => !show)} />
            </Button>
          </Popover>
          <Avatar className="avatar" icon={<UserOutlined />} onClick={() => { void handleLogout(); }}/>
        </div>
        {/* {showNotification && <Notification />} */}
      </>
        : null}
    </AntdHeader>
  );
};

export default Header;
