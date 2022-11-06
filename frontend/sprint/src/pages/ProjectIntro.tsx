import SpaceCard from '@components/SpaceCard';
import { Avatar, List, Table, Tag } from 'antd';
import { useNavigate } from 'react-router-dom';

const taskColumns = [
  {
    title: 'Task',
    key: 'task',
    dataIndex: 'task'
  },
  {
    title: 'Team',
    key: 'team',
    dataIndex: 'team',
    render: (members: string[]) => (
      <Avatar.Group>
        {members.map(member => <Avatar key={member}>{member}</Avatar>)}
      </Avatar.Group>
    )
  },
  {
    title: 'Document Spaces',
    key: 'documentSpaces',
    dataIndex: 'documentSpaces',
    render: (spaces: string[]) => (
      spaces.map(space => <Tag key={space}>{space}</Tag>)
    )
  },
  {
    title: 'Last Updated',
    key: 'updatedAt',
    dataIndex: 'updatedAt'
  }
];

const dummyTaskList = [
  {
    key: 1,
    task: 'Play League of Legends',
    team: ['S', 'H'],
    documentSpaces: ['Space 1', 'Space 2'],
    updatedAt: '2 days ago'
  },
  {
    key: 2,
    task: 'Play Overwatch 2',
    team: ['K', 'J'],
    documentSpaces: ['Duck', 'In'],
    updatedAt: '2 days ago'
  }
];

const ProjectIntro: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="project-intro">
      <div className="project-info">Summary of Thousands Brains: Scientific Tech and Writing</div>
      <div className="project-header">Description</div>
      <div className="project-description">
        Lorem Ipsum is simply dummy text of t
        he printing and typesetting industry. Lorem Ipsu
        m has been the industry&#39;s standard dum
        my text ever since the 1500s, when an unkno
        wn printer took a galley of type and scram
        bled it to make a type specimen book. It h
        as survived not only five centuries, but a
        lso the leap into electronic typesetting, rem
        aining essentially unchanged. It was popular
        ised in the 1960s with the release of Letras
        et sheets containing Lorem Ipsum passages, an
        d more recently with desktop publishing soft
        ware like Aldus PageMaker including vers
        ions of Lorem Ipsum.
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
              dataSource={[1, 2, 3]}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar>K</Avatar>}
                    title="Seokwoo Choi"
                    description="poding84@snu.ac.kr"
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
            <SpaceCard name="Space 1" email="yohoho" />
            <SpaceCard name="Space 2" email="yohoho" />
            <SpaceCard name="Space 3" email="yohoho" />
          </div>
        </div>
      </div>
      <div className="task-list">
        Task List
        <div className="link" onClick={() => navigate('add_task')}>Add new task</div>
      </div>
      <Table
        dataSource={dummyTaskList}
        columns={taskColumns}
        pagination={false}
      />
    </div>
  );
};

export default ProjectIntro;
