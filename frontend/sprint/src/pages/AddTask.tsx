import AutoOption from '@components/AutoOption';
import { AppDispatch } from '@store/index';
import { projectActions, selectProject } from '@store/slices/project';
import { dummyMembers, MemberType, TaskType } from '@utils/dummy';
import { AutoComplete, Avatar, Button, DatePicker, Divider, Input, List } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

const AddTask: React.FC = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');
  const [inviteList, setInviteList] = useState<MemberType[]>([]);
  const [dueDate, setDueDate] = useState('');
  const projectState = useSelector(selectProject);
  const project = projectState.find(project => project.id === parseInt(projectId ?? '0'));
  const nextId = (project === undefined ? 1 : project.tasks.length + 1);
  const onInviteClick: () => void = () => {
    const invite = dummyMembers.find(member => member.email === email);
    if (invite === undefined) return;
    setInviteList(inviteList => [...inviteList, invite]);
    setEmail('');
  };
  const createTask: () => void = () => {
    if (taskName === '' || description === '' || dueDate === '') return;
    const newTask: TaskType = {
      name: taskName,
      description,
      id: nextId, // Math.floor(10000 * Math.random()),
      updatedAt: '1 min ago',
      members: inviteList,
      documentSpaces: [],
      comments: [],
      dueDate,
      status: 'ongoing'
    };
    if (projectId !== undefined) {
      dispatch(projectActions.addTask({ projectId: parseInt(projectId), newTask }));
      navigate(`/projects/${projectId}/tasks/${newTask.id}`);
    }
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
              options={email.length > 0
                ? dummyMembers.map(member => ({
                  value: member.email,
                  name: member.name,
                  label: <AutoOption member={member} />
                }))
                : []}
              value={email}
              onChange={e => setEmail(e)}
              filterOption={(inputValue, option) => {
                if (option === undefined) return false;
                return option.value.toUpperCase().includes(inputValue.toUpperCase()) || option.name.toUpperCase().includes(inputValue.toUpperCase());
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
