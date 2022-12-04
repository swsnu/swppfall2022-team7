import RandomRole from '@components/RandomRole';
import SpaceCard from '@components/SpaceCard';
import UserCard from '@components/UserCard';
import useBindStore from '@store/zustand';
import { TaskType } from '@store/zustand/task';
import { DocumentSpaceType, MemberType } from '@utils/dummy';
import { Avatar, Button, List, Table, Tag } from 'antd';
import { Key, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ProjectIntro: React.FC = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const project = useBindStore(state => state.selectedProject);
  const selectProject = useBindStore(state => state.selectProject);
  const selectedProject = useBindStore(state => state.selectedProject);
  console.log(selectedProject);
  useEffect(() => {
    if (projectId === undefined) return;
    void selectProject(parseInt(projectId));
  }, [projectId]);
  const [randomIdList, setRandomIdList] = useState<Key[]>([]);
  const [showModal, setShowModal] = useState(false);
  const taskColumns = [
    {
      title: 'Task',
      key: 'name',
      dataIndex: 'name',
      render: (text: any, record: TaskType) => {
        return <div className="task-link" onClick={() => navigate(`tasks/${record.id}`)}>{text}</div>;
      }
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
  return (
    <>
      <div className="project-intro">
        <div className="project-info">{project?.name}: {project?.subject}</div>
        {/* <div className="project-header">Description</div>
        <div className="project-description">
          {project?.description}
        </div> */}
        <div className="project-flex">
          <div className="team-members">
            <div className="team-members-title">
              Team Members
              <div className="link">Edit team</div>
            </div>
              <List
                className="invite-list"
                itemLayout="horizontal"
                dataSource={project?.member_list}
                renderItem={item => (
                  <UserCard user={item} />
                )}
              />
          </div>
          <div className="document-spaces">
            <div className="document-space-title">
              Document Spaces
              <div className="link" onClick={() => navigate('docs')}>Edit space</div>
            </div>
            <div className="member-container">
              {/* {project?.documentSpaces.map(space => (
                <SpaceCard key={space.id} name={space.name} email={space.updatedAt} />
              ))} */}
            </div>
          </div>
        </div>
        <div className="task-list">
          Task List
          <span className="task-buttons">
            <Button className="random-assign" disabled={randomIdList.length === 0} onClick={() => setShowModal(true)}>
              Random Assign
            </Button>
            <div className="link" onClick={() => navigate('add_task')}>Add new task</div>
          </span>
        </div>
        <Table
          dataSource={project?.task_list?.map(task => ({ ...task, key: task.id }))}
          columns={taskColumns}
          pagination={false}
          rowSelection={{
            type: 'checkbox',
            onChange: (selectedRowKeys, selectedRows) => {
              setRandomIdList(selectedRowKeys);
            },
            getCheckboxProps: record => ({
              disabled: record.assignee !== null
            }),
            selectedRowKeys: randomIdList
          }}
        />
      </div>
      <RandomRole randomIdList={randomIdList} setRandomIdList={setRandomIdList} showModal={showModal} setShowModal={setShowModal} />
    </>
  );
};

export default ProjectIntro;
