import ProjectCard from '@components/ProjectCard';
import { Button, Row } from 'antd';

const Home: React.FC = () => {
  return (
    <div className="home">
      <div className="title-bar">
        Projects
        <Button type="primary">New Project</Button>
      </div>
      <Row gutter={[24, 24]}>
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
      </Row>
    </div>
  );
};

export default Home;
