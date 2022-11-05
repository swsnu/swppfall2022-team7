import { Layout, Avatar, Badge } from 'antd';
import { BellFilled, UserOutlined, FireFilled } from '@ant-design/icons';
import Notification from './Notification';
import { useState } from 'react';

const { Header: AntdHeader } = Layout;

const Header: React.FC = () => {
  const [showNotification, setShowNotification] = useState(false);
  return (
    <AntdHeader className="header">
      <div className="header-logo">
        <FireFilled className="logo-icon" />
        Sprint
      </div>
      <div className="header-user-menu">
        <Badge count={2} size="small">
          <BellFilled className="bell-icon" onClick={() => setShowNotification(show => !show)} />
        </Badge>
        <Avatar className="avatar" icon={<UserOutlined />} />
      </div>
      {showNotification && <Notification />}
    </AntdHeader>
  );
};

export default Header;
