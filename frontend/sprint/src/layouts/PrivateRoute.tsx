import useBindStore from '@store/zustand';
import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoute: React.FC = () => {
  const user = useBindStore(state => state.user);
  return user === null ? <Navigate to="/login" /> : <Outlet />;
};

export default PrivateRoute;
