import { CopyOutlined } from '@ant-design/icons';
import { ProjectType } from '@utils/dummy';
import { Avatar, Col } from 'antd';
import { useNavigate } from 'react-router-dom';

const ProjectCard: React.FC<{ project: ProjectType }> = ({ project }: { project: ProjectType }) => {
  const navigate = useNavigate();
  return (
    <Col xs={24} sm={12} md={8} lg={6}>
      <div className="project-card" onClick={() => navigate(`/projects/${project.id}`)}>
        <div className="project-name">
          {project.name}
        </div>
        <div className="last-edited">
          Updated: {project.updatedAt}
        </div>
        <div className="info-tab">
          <Avatar.Group>
            {project.members.slice(0, 3).map(member => (
              <Avatar key={member.id} size="small" className="avatar">{member.avatar}</Avatar>
            ))}
            <Avatar size="small" className="avatar">+{project.members.length - 3}</Avatar>
          </Avatar.Group>
          <div className="task-badge">
            <CopyOutlined />
            {project.documents}
          </div>
        </div>
      </div>
    </Col>
  );
};

export default ProjectCard;
