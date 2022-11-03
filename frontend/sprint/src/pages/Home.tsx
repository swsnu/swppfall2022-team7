import MyTasks from '@components/MyTasks';
import ProjectCard from '@components/ProjectCard';
import { Button, Row } from 'antd';

const Home: React.FC = () => {
  return (
    <div className='home'>
      <div className='project-title-tab'>
        Projects
        <Button type='primary'>New Project</Button>
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
      <div className='task-title-tab'>
        My Tasks
      </div>
      <MyTasks />
    </div>
  );
};

export default Home;
