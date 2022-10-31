import { ReactElement } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '@components/Header';

const Layout: () => ReactElement = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;
