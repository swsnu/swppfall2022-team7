import useBindStore from '@store/zustand';
import { useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoute: React.FC = () => {
  const token = localStorage.getItem('token');
  const getUser = useBindStore(state => state.getUser);
  useEffect(() => {
    if (token !== null) void getUser();
  }, []);
  return token === null ? <Navigate to="/login" /> : <Outlet />;
};

export default PrivateRoute;
