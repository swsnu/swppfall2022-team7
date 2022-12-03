import { Layout, Avatar, Badge } from 'antd';
import { BellFilled, UserOutlined, FireFilled } from '@ant-design/icons';
import Notification from './Notification';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useBindStore from '@store/zustand';

const { Header: AntdHeader } = Layout;

const Header: React.FC = () => {
  const user = useBindStore(state => state.user);
  const logOut = useBindStore(state => state.logOut);
  const [showNotification, setShowNotification] = useState(false);
  const navigate = useNavigate();
  return (
    <AntdHeader className="header">
      <div className="header-logo" onClick={() => navigate('/projects')}>
        <FireFilled className="logo-icon" />
        Sprint
      </div>
      {
      user !== null
        ? <>
        <div className="header-user-menu">
          <Badge count={3} size="small">
            <BellFilled className="bell-icon" onClick={() => setShowNotification(show => !show)} />
          </Badge>
          <Avatar className="avatar" icon={<UserOutlined />} onClick={() => { void logOut(); }}/>
        </div>
        {showNotification && <Notification />}
      </>
        : null}
    </AntdHeader>
  );
};

export default Header;
