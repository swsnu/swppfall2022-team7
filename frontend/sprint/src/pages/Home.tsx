import MyTasks from '@components/MyTasks';
import ProjectCard from '@components/ProjectCard';
import { Button, Row } from 'antd';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectProject } from '@store/slices/project';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const projectState = useSelector(selectProject);

  return (
    <div className="home">
      <div className="project-title-tab">
        Projects
        <Button type="primary" onClick={() => navigate('new-project')}>
          New Project
        </Button>
      </div>
      <Row gutter={[24, 24]}>
        {projectState.map(project => <ProjectCard key={project.id} project={project} />)}
      </Row>
      <div className="task-title-tab">
        My Tasks
      </div>
      <MyTasks />
    </div>
  );
};

export default Home;
