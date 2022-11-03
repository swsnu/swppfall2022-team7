import { Layout, Avatar, Badge } from 'antd';
import { BellFilled, UserOutlined, FireFilled } from '@ant-design/icons';

const { Header: AntdHeader } = Layout;

const Header: React.FC = () => {
  return (
    <AntdHeader className="header">
      <div className="header-logo">
        <FireFilled className="logo-icon" />
        Sprint
      </div>
      <div className="header-user-menu">
        <Badge count={2} size="small">
          <BellFilled className="bell-icon" />
        </Badge>
        <Avatar className="avatar" icon={<UserOutlined />} />
      </div>
    </AntdHeader>
  );
};

export default Header;
