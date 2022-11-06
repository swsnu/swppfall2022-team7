import SpaceCard from '@components/SpaceCard';
import { selectProject } from '@store/slices/project';
import { DocumentSpaceType, MemberType } from '@utils/dummy';
import { Avatar, List, Table, Tag } from 'antd';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

const taskColumns = [
  {
    title: 'Task',
    key: 'name',
    dataIndex: 'name'
  },
  {
    title: 'Members',
    key: 'members',
    dataIndex: 'members',
    render: (members: MemberType[]) => (
      <Avatar.Group>
        {members.map(member => <Avatar key={member.id}>{member.avatar}</Avatar>)}
      </Avatar.Group>
    )
  },
  {
    title: 'Document Spaces',
    key: 'documentSpaces',
    dataIndex: 'documentSpaces',
    render: (spaces: DocumentSpaceType[]) => (
      spaces.map(space => <Tag key={space.id}>{space.name}</Tag>)
    )
  },
  {
    title: 'Last Updated',
    key: 'updatedAt',
    dataIndex: 'updatedAt'
  }
];

const ProjectIntro: React.FC = () => {
  const navigate = useNavigate();
  const projectState = useSelector(selectProject);
  const { projectId } = useParams();
  const project = projectState.find(project => project.id === parseInt(projectId ?? '0'));
  return (
    <div className="project-intro">
      <div className="project-info">{project?.name}: {project?.subject}</div>
      <div className="project-header">Description</div>
      <div className="project-description">
        {project?.description}
      </div>
      <div className="project-flex">
        <div className="team-members">
          <div className="team-members-title">
            Team Members
            <div className="link">Edit team</div>
          </div>
            <List
              className="invite-list"
              itemLayout="horizontal"
              dataSource={project?.members}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar>{item.avatar}</Avatar>}
                    title={item.name}
                    description={item.email}
                  />
                </List.Item>
              )}
            />
        </div>
        <div className="document-spaces">
          <div className="document-space-title">
            Document Spaces
            <div className="link" onClick={() => navigate('docs')}>Edit space</div>
          </div>
          <div className="member-container">
            {project?.documentSpaces.map(space => (
              <SpaceCard key={space.id} name={space.name} email={space.updatedAt} />
            ))}
          </div>
        </div>
      </div>
      <div className="task-list">
        Task List
        <div className="link" onClick={() => navigate('add_task')}>Add new task</div>
      </div>
      <Table
        dataSource={project?.tasks.map(task => ({ ...task, key: task.id }))}
        columns={taskColumns}
        pagination={false}
      />
    </div>
  );
};

export default ProjectIntro;
