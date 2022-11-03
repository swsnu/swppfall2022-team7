import { EllipsisOutlined, StarOutlined } from '@ant-design/icons';
import { Avatar, Card, Col } from 'antd';

const { Meta } = Card;

const ProjectCard: React.FC = () => {
  return (
    <Col xs={24} sm={12} md={8} lg={6}>
      <Card
        className="project-card"
        hoverable
        actions={[
          <StarOutlined key="star" />,
          <EllipsisOutlined key="ellipsis" />
        ]}
      >
        <Meta
          title="Project 1"
          description="Subject 1"
          avatar={<Avatar>K</Avatar>}
        />
      </Card>
    </Col>
  );
};

export default ProjectCard;
