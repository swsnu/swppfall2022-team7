import { CopyOutlined } from '@ant-design/icons';
import { ProjectType } from '@store/zustand/project';
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
          Updated: {project.last_modified}
        </div>
        <div className="info-tab">
          <Avatar.Group>
            {project.member_list.slice(0, 3).map(member => (
              <Avatar key={member.id} size="small" className="avatar">{member.username.substring(0, 1).toUpperCase()}</Avatar>
            ))}
            {project.member_list.length > 3 && <Avatar size="small" className="avatar">+{project.member_list.length - 3}</Avatar>}
          </Avatar.Group>
          <div className="task-badge">
            <CopyOutlined />
            {project.document_number}
          </div>
        </div>
      </div>
    </Col>
  );
};

export default ProjectCard;
