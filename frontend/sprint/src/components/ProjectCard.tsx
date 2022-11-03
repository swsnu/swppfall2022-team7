import { CopyOutlined } from '@ant-design/icons';
import { Avatar, Col } from 'antd';

const ProjectCard: React.FC = () => {
  return (
    <Col xs={24} sm={12} md={8} lg={6}>
      <div className="project-card">
        <div className="project-name">
          Project 1
        </div>
        <div className="last-edited">
          Updated: 1 hour ago
        </div>
        <div className="info-tab">
          <Avatar.Group>
            <Avatar size="small" className="avatar" style={{ backgroundColor: '#06c' }}>K</Avatar>
            <Avatar size="small" className="avatar" style={{ backgroundColor: 'orange' }}>S</Avatar>
            <Avatar size="small" className="avatar" style={{ backgroundColor: 'green' }}>H</Avatar>
            <Avatar size="small" className="avatar">+5</Avatar>
          </Avatar.Group>
          <div className="task-badge">
            <CopyOutlined />
            5
          </div>
        </div>
      </div>
    </Col>
  );
};

export default ProjectCard;
