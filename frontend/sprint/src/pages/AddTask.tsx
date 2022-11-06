import AutoOption from '@components/AutoOption';
import { AutoComplete, Avatar, Button, Divider, Input, List } from 'antd';
import { useState } from 'react';

const AddTask: React.FC = () => {
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [email, setEmail] = useState('');
  const [inviteList, setInviteList] = useState<string[]>([]);
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
          <label htmlFor="subject-name">Task Description</label>
          <Input id="subject-name" placeholder="Task Description" value={taskDescription} onChange={e => setTaskDescription(e.target.value)} />
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
              options={[
                {
                  value: 'kshunn@snu.ac.kr',
                  label: <AutoOption />
                },
                {
                  value: 'poding84@snu.ac.kr',
                  label: <AutoOption />
                }
              ]}
              value={email}
              onChange={e => setEmail(e)}
            />
            <Button
              type="primary"
              disabled={email.length === 0}
              onClick={() => setInviteList(inviteList => [...inviteList, email])}
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
                  avatar={<Avatar>K</Avatar>}
                  title="Seokwoo Choi"
                  description="poding84@snu.ac.kr"
                />
              </List.Item>
            )}
          />
        </div>
      </div>
      <div className="submit">
        <Button type="primary">Create Task</Button>
      </div>
    </div>
  );
};

export default AddTask;
