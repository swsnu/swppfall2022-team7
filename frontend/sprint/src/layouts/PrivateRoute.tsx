import { GET_PROJECTS_URL } from '@services/api';
import useBindStore from '@store/zustand';
import axios from 'axios';
import { useEffect } from 'react';
import { Outlet, Navigate, useNavigate, useParams } from 'react-router-dom';

const PrivateRoute: React.FC = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const user = useBindStore(state => state.user);
  const getUser = useBindStore(state => state.getUser);
  useEffect(() => {
    if (projectId === undefined || user === null) return;
    const checkAsyncAuth = async (): Promise<void> => {
      const res = await axios.get(GET_PROJECTS_URL(String(user?.id)));
      for (const project of res.data.project_list) {
        if (project.id === parseInt(projectId)) return;
      }
      navigate('/projects');
    };
    void checkAsyncAuth();
  }, [projectId, user]);
  useEffect(() => {
    if (token !== null) void getUser();
  }, []);
  return token === null ? <Navigate to="/login" /> : <Outlet />;
};

export default PrivateRoute;
