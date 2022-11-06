import AutoOption from '@components/AutoOption';
import { dummyProject, MemberType } from '@utils/dummy';
import { AutoComplete, Avatar, Button, Divider, Input, List } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddTask: React.FC = () => {
  const navigate = useNavigate();
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');
  const [inviteList, setInviteList] = useState<MemberType[]>([]);
  const onInviteClick: () => void = () => {
    const invite = dummyProject.members.find(member => member.email === email);
    if (invite === undefined) return;
    setInviteList(inviteList => [...inviteList, invite]);
    setEmail('');
  };
  const createTask: () => void = () => {
    if (taskName === '' || description === '') return;
    navigate('/projects');
  };
  return (
    <div className="new-task">
      <div className="title-tab">
        Create a New Task
      </div>
      <div className="form-tab">
        <div className="form-description">
          <div className="form-title">Task Information</div>
          <div className="form-text">Enter your task information</div>
        </div>
        <div className="input-form">
          <label htmlFor="project-name">Task Name</label>
          <Input id="project-name" placeholder="Task Name" value={taskName} onChange={e => setTaskName(e.target.value)} />
          <label htmlFor="subject-name">Description</label>
          <Input id="subject-name" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
        </div>
      </div>
      <Divider />
      <div className="form-tab">
        <div className="form-description">
          <div className="form-title">Task Participants</div>
          <div className="form-text">Add your task participants</div>
        </div>
        <div className="input-form">
          <label htmlFor="invite-email">Send Invitiation to..</label>
          <div className="invite-input">
            <AutoComplete
              id="invite-email"
              style={{ width: '100%' }}
              placeholder="example@snu.ac.kr"
              options={email.length > 0
                ? dummyProject.members.map(member => ({
                  value: member.email,
                  label: <AutoOption member={member} />
                }))
                : []}
              value={email}
              onChange={e => setEmail(e)}
              filterOption={(inputValue, option) => {
                if (option === undefined) return false;
                return option.value.toUpperCase().includes(inputValue.toUpperCase());
              }}
            />
            <Button
              type="primary"
              disabled={email.length === 0}
              onClick={onInviteClick}
            >
              Invite
            </Button>
          </div>
          <List
            className="invite-list"
            itemLayout="horizontal"
            dataSource={inviteList}
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
      </div>
      <div className="submit">
        <Button type="primary" onClick={createTask}>Create Task</Button>
      </div>
    </div>
  );
};

export default AddTask;
