import { Layout, Avatar, Popover, Button } from 'antd';
import { BellFilled, UserOutlined, FireFilled } from '@ant-design/icons';
import Notification from './Notification';
import { useNavigate } from 'react-router-dom';
import useBindStore from '@store/zustand';
import UserMenu from './UserMenu';
import { iconString } from '@utils/utils';

const { Header: AntdHeader } = Layout;

const Header: React.FC = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const user = useBindStore(state => state.user);
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
          <Popover trigger="click" content={<Notification />} placement="bottomRight">
            <Button className="pop-button">
              <BellFilled className="bell-icon" />
            </Button>
          </Popover>
          <Popover trigger="click" content={<UserMenu />} placement="bottomRight">
            <Avatar className="avatar">{iconString(user?.username ?? '')}</Avatar>
          </Popover>
        </div>
      </>
        : null}
    </AntdHeader>
  );
};

export default Header;
