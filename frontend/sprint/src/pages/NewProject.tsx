import AutoOption from '@components/AutoOption';
import { AutoComplete, Avatar, Button, Divider, Input, List } from 'antd';
import { useState } from 'react';

const NewProject: React.FC = () => {
  const [projectName, setProjectName] = useState('');
  const [subjectName, setSubjectName] = useState('');
  const [email, setEmail] = useState('');
  const [inviteList, setInviteList] = useState<string[]>([]);
  return (
    <div className="new-project">
      <div className="title-tab">
        Create a New Project
      </div>
      <div className="form-tab">
        <div className="form-description">
          <div className="form-title">Project and Subject Name</div>
          <div className="form-text">Enter your project and subject name</div>
        </div>
        <div className="input-form">
          <label htmlFor="project-name">Project Name</label>
          <Input id="project-name" placeholder="Project Name" value={projectName} onChange={e => setProjectName(e.target.value)} />
          <label htmlFor="subject-name">Subject Name</label>
          <Input id="subject-name" placeholder="Subject Name" value={subjectName} onChange={e => setSubjectName(e.target.value)} />
        </div>
      </div>
      <Divider />
      <div className="form-tab">
        <div className="form-description">
          <div className="form-title">Project Participants</div>
          <div className="form-text">Add your project participants</div>
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
        <Button type="primary">Create Project</Button>
      </div>
    </div>
  );
};

export default NewProject;
