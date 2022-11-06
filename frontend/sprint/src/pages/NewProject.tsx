import AutoOption from '@components/AutoOption';
import { dummyProject, MemberType } from '@utils/dummy';
import { AutoComplete, Avatar, Button, Divider, Input, List } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NewProject: React.FC = () => {
  const navigate = useNavigate();
  const [projectName, setProjectName] = useState('');
  const [subjectName, setSubjectName] = useState('');
  const [email, setEmail] = useState('');
  const [inviteList, setInviteList] = useState<MemberType[]>([]);
  const onInviteClick: () => void = () => {
    const invite = dummyProject.members.find(member => member.email === email);
    if (invite === undefined) return;
    setInviteList(inviteList => [...inviteList, invite]);
    setEmail('');
  };
  const createProject: () => void = () => {
    if (projectName === '' || subjectName === '') return;
    navigate('/projects');
  };
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
        <Button type="primary" onClick={createProject}>Create Project</Button>
      </div>
    </div>
  );
};

export default NewProject;
