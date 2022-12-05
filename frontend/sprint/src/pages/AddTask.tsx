import AutoOption from '@components/AutoOption';
import UserCard from '@components/UserCard';
import useBindStore from '@store/zustand';
import { UserType } from '@store/zustand/user';
import { AutoComplete, Button, DatePicker, Divider, Input, List } from 'antd';
import { BaseOptionType } from 'antd/lib/select';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const AddTask: React.FC = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [query, setQuery] = useState('');
  const [queryList, setQueryList] = useState<UserType[]>([]);
  const [selectedUser, setSelectedUser] = useState<string>('');
  const [inviteList, setInviteList] = useState<Array<Omit<UserType, 'id'>>>([]);
  const [emailList, setEmailList] = useState<string[]>([]);
  const [dueDate, setDueDate] = useState('');
  const addTask = useBindStore(state => state.addTask);
  const selectProject = useBindStore(state => state.selectProject);
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
  const createTask = async (): Promise<void> => {
    if (taskName === '' || description === '' || dueDate === '') return;
    if (projectId === undefined) return;
    const newTaskId = await addTask(parseInt(projectId), taskName, description, emailList.length === 0 ? '' : emailList[0], dueDate);
    await selectProject(parseInt(projectId));
    navigate(`/projects/${projectId}/tasks/${newTaskId}`);
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
        <div className="add-task-input-form">
          <label htmlFor="project-name">Task Name</label>
          <Input id="project-name" placeholder="Task Name" value={taskName} onChange={e => setTaskName(e.target.value)} />
          <label htmlFor="subject-name">Description</label>
          <Input id="subject-name" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
          <label htmlFor="due-date">Due Date</label>
          <DatePicker id="due-date" placeholder="Due Date" onChange={(_, dateString) => setDueDate(dateString)} />
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
        <Button type="primary" onClick={() => { void createTask(); }}>Create Task</Button>
      </div>
    </div>
  );
};

export default AddTask;
