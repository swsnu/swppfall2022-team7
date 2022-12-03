import MyTasks from '@components/MyTasks';
import ProjectCard from '@components/ProjectCard';
import { Button, Row } from 'antd';
import { useNavigate } from 'react-router-dom';
import useBindStore from '@store/zustand';
import { useEffect } from 'react';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const projects = useBindStore(state => state.projects);
  const getProjects = useBindStore(state => state.getProjects);

  useEffect(() => {
    const asyncGetProjects: () => Promise<void> = async () => {
      const userId = localStorage.getItem('userId');
      if (userId === null) return;
      await getProjects(userId);
    };
    void asyncGetProjects();
  }, []);

  return (
    <div className="home">
      <div className="project-title-tab">
        Projects
        <Button type="primary" onClick={() => navigate('new-project')}>
          New Project
        </Button>
      </div>
      <Row gutter={[24, 24]}>
        {projects.map(project => <ProjectCard key={project.id} project={project} />)}
      </Row>
      <div className="task-title-tab">
        My Tasks
      </div>
      <MyTasks />
    </div>
  );
};

export default Home;
