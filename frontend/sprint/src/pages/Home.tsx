import MyTasks from '@components/MyTasks';
import ProjectCard from '@components/ProjectCard';
import { Button, Row } from 'antd';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="home">
      <div className="project-title-tab">
        Projects
        <Button type="primary" onClick={() => navigate('new-project')}>
          New Project
        </Button>
      </div>
      <Row gutter={[24, 24]}>
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
      </Row>
      <div className="task-title-tab">
        My Tasks
      </div>
      <MyTasks />
    </div>
  );
};

export default Home;
