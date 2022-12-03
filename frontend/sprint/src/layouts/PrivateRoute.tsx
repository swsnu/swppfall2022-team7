import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoute: React.FC = () => {
  const token = localStorage.getItem('token');
  return token === null ? <Navigate to="/login" /> : <Outlet />;
};

export default PrivateRoute;
