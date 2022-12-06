import AutoOption from '@components/AutoOption';
import UserCard from '@components/UserCard';
import useBindStore from '@store/zustand';
import { UserType } from '@store/zustand/user';
import { AutoComplete, Button, Divider, Input, List } from 'antd';
import { BaseOptionType } from 'antd/lib/select';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NewProject: React.FC = () => {
  const navigate = useNavigate();
  const [projectName, setProjectName] = useState('');
  const [subjectName, setSubjectName] = useState('');
  const [query, setQuery] = useState('');
  const [queryList, setQueryList] = useState<UserType[]>([]);
  const [selectedUser, setSelectedUser] = useState<string>('');
  const [inviteList, setInviteList] = useState<Array<Omit<UserType, 'id'>>>([]);
  const [emailList, setEmailList] = useState<string[]>([]);
  const addProject = useBindStore(state => state.addProject);
  const getAutoComplete = useBindStore(state => state.getAutoComplete);
  useEffect(() => {
    const asyncGetAutoComplete = async (): Promise<void> => {
      if (query === '') return;
      const autoComplete = await getAutoComplete(query);
      setQueryList(autoComplete);
    };
    void asyncGetAutoComplete();
  }, [query]);
  const onSelect: (value: string, option: BaseOptionType) => void = (value, option) => {
    setQuery(value);
    setSelectedUser(option.name);
  };
  const onInviteClick: () => void = () => {
    setInviteList(inviteList => [...inviteList, { username: selectedUser, email: query }]);
    setEmailList(emailList => [...emailList, query]);
    setQuery('');
  };
  const createProject: () => void = () => {
    if (projectName === '' || subjectName === '') return;
    void addProject(projectName, subjectName, emailList);
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
              options={query.length > 0
                ? queryList.map(member => ({
                  value: member.email,
                  name: member.username,
                  label: <AutoOption member={member} />
                }))
                : []}
              value={query}
              onChange={e => setQuery(e)}
              onSelect={onSelect}
            />
            <Button
              type="primary"
              disabled={query.length === 0}
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
              <UserCard user={item} />
            )}
          />
        </div>
      </div>
      <div className="submit">
        <Button type="primary" onClick={createProject} disabled={projectName === '' || subjectName === '' || emailList.length === 0}>
          Create Project
        </Button>
      </div>
    </div>
  );
};

export default NewProject;
