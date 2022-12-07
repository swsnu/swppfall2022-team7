import { useEffect, useState } from 'react';
import { List, Avatar, Button, Modal, AutoComplete, Input } from 'antd';
import AutoOption from '@components/AutoOption';
import { UserType } from '@store/zustand/user';
import useBindStore from '@store/zustand';
import { BaseOptionType } from 'antd/lib/select';
import UserCard from '@components/UserCard';
import { useNavigate, useParams } from 'react-router-dom';

const ProjectManage: React.FC = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [openAdd, setOpenAdd] = useState(false);
  const [openDissolve, setOpenDissolve] = useState(false);
  const [dissolve, setDissolve] = useState('');
  const [query, setQuery] = useState('');
  const [queryList, setQueryList] = useState<UserType[]>([]);
  const [selectedUser, setSelectedUser] = useState<string>('');
  const [selectedUserId, setSelectedUserId] = useState<number>(0);
  const [inviteList, setInviteList] = useState<Array<Omit<UserType, 'id'>>>([]);
  const [idList, setIdList] = useState<number[]>([]);
  const project = useBindStore(state => state.selectedProject);
  const getAutoComplete = useBindStore(state => state.getAutoComplete);
  const addMember = useBindStore(state => state.addMember);
  const deleteMember = useBindStore(state => state.deleteMember);
  const selectProject = useBindStore(state => state.selectProject);
  const deleteProject = useBindStore(state => state.deleteProject);

  useEffect(() => {
    const asyncGetAutoComplete: () => Promise<void> = async () => {
      if (query === '') return;
      const autoComplete = await getAutoComplete(query);
      setQueryList(autoComplete);
    };
    void asyncGetAutoComplete();
  }, [query]);

  const onSelect: (value: string, option: BaseOptionType) => void = (value, option) => {
    setQuery(value);
    setSelectedUser(option.name);
    setSelectedUserId(option.id);
  };

  const onInviteClick: () => void = () => {
    setInviteList(inviteList => [...inviteList, { username: selectedUser, email: query }]);
    setIdList(idList => [...idList, selectedUserId]);
    setQuery('');
  };

  const onDeleteClick = async (userId: number): Promise<void> => {
    if (projectId === undefined) return;
    await deleteMember(parseInt(projectId), userId);
    await selectProject(parseInt(projectId));
  };

  const onAddConfirmClicked = async (): Promise<void> => {
    if (projectId === undefined) return;
    await addMember(parseInt(projectId), idList);
    await selectProject(parseInt(projectId));
    setOpenAdd(false);
    setQuery('');
    setInviteList([]);
    setIdList([]);
  };

  const onAddCancelClicked = (): void => {
    setOpenAdd(false);
    setQuery('');
    setInviteList([]);
    setIdList([]);
  };

  const onDissolveConfirmClicked = async (): Promise<void> => {
    await deleteProject(parseInt(projectId ?? '0'));
    setOpenDissolve(false);
    setDissolve('');
    navigate('/projects');
  };

  const onDissolveCancelClicked = (): void => {
    setOpenDissolve(false);
    setDissolve('');
  };

  return (
    <>
      <div className="project-manage">
        <div className="project-info">{project?.name}: {project?.subject}: Contribution</div>
        <div className="settings-header">Project Management</div>
        <div className="team-members">
          <div className="team-members-title">
            Team Members
            <Button onClick={() => { setOpenAdd(true); }}>Add a new member</Button>
          </div>
          <List
            itemLayout="horizontal"
            dataSource={project?.member_list}
            renderItem={item => (
              <List.Item
                actions={[<a key="list-delete" onClick={() => { void onDeleteClick(item.id); }}>delete</a>]}
              >
                <List.Item.Meta
                  avatar={<Avatar>{item.username.substring(0, 1).toUpperCase()}</Avatar>}
                  title={item.username}
                  description={item.email}
                />
              </List.Item>
            )}
          />
        </div>
        <div className="dissolve-container">
          <div className="dissolve-left">
            <div className="dissolve-header">
              Dissolve Project
            </div>
            <div className="dissolve-desc">
              This will lead to irreversible consequence, like permanent loss of project files, tasks, etc. Please be certain.
            </div>
          </div>
          <Button type="primary" danger onClick={() => { setOpenDissolve(true); }}>Dissolve Project</Button>
        </div>
      </div>
      <Modal
        open={openAdd}
        title={<div style={{ fontWeight: 'bold' }}>Add a new member</div>}
        onCancel={onAddCancelClicked}
        footer={[
          <Button key="cancel" onClick={onAddCancelClicked}>Cancel</Button>,
          <Button type="primary" key="confirm" onClick={() => { void onAddConfirmClicked(); }}>Confirm</Button>
        ]}
        width={1000}
      >
        <div className="form-tab">
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
                    label: <AutoOption member={member} />,
                    id: member.id
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
      </Modal>
      <Modal
        open={openDissolve}
        title={<div style={{ fontWeight: 'bold' }}>Dissolve Project</div>}
        onCancel={onDissolveCancelClicked}
        footer={[
          <Button key="cancel" onClick={onDissolveCancelClicked}>Cancel</Button>,
          <Button type="primary" danger key="confirm" disabled={dissolve !== project?.name} onClick={() => { void onDissolveConfirmClicked(); }}>Dissolve</Button>
        ]}
        width={1000}
      >
        <div className="dissolve-container">
          <div className="dissolve-warning">Please read carefully. This work is irreversible.</div>
          <p className="dissolve-desc">This action <strong>cannot</strong> be undone. This will permanently delete the <strong>{project?.name}</strong> project, documents, schedules and every task infos.</p>
          <p className="dissolve-desc">This will not affect your status as member of Sprint. If you want to exit this project, you can be deleted by authorzied project members.</p>
          <p className="dissolve-desc">Please type <strong>{project?.name}</strong> to confirm.</p>
          <Input value={dissolve} onChange={(e) => { setDissolve(e.target.value); }} />
        </div>
      </Modal>
    </>
  );
};

export default ProjectManage;
