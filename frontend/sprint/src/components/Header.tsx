import { Layout, Avatar, Popover, Button, Badge } from 'antd';
import { BellFilled, FireFilled } from '@ant-design/icons';
import Notification from './Notification';
import { useNavigate } from 'react-router-dom';
import useBindStore from '@store/zustand';
import UserMenu from './UserMenu';
import { iconString } from '@utils/utils';
import { useEffect } from 'react';

const { Header: AntdHeader } = Layout;

const Header: React.FC = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const user = useBindStore(state => state.user);
  const newNoti = useBindStore(state => state.newNoti);
  const getNewNoti = useBindStore(state => state.getNewNoti);
  const getNoti = useBindStore(state => state.getNoti);
  const onOpenChange = async (open: boolean): Promise<void> => {
    if (!open) await getNewNoti();
    else await getNoti();
  };
  useEffect(() => {
    const getAsyncNewNoti = async (): Promise<void> => {
      await getNewNoti();
    };
    if (user !== null) void getAsyncNewNoti();
  }, [navigate]);
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
          <Popover trigger="click" content={<Notification />} placement="bottomRight" onOpenChange={(open) => { void onOpenChange(open); }}>
            <Button className="pop-button">
              {newNoti === 0 ? <BellFilled className="bell-icon" /> : <Badge size="small" count={newNoti}><BellFilled className="bell-icon" /></Badge>}
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
