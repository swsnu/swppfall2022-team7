import { selectProject } from '@store/slices/project';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { List, Avatar, Button, Modal, AutoComplete, Input } from 'antd';
import AutoOption from '@components/AutoOption';
import { dummyMembers, MemberType } from '@utils/dummy';
import { UserType } from '@store/zustand/user';
import useBindStore from '@store/zustand';
import { BaseOptionType } from 'antd/lib/select';

const ProjectManage: React.FC = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const [openDissolve, setOpenDissolve] = useState(false);
  const [dissolve, setDissolve] = useState('');
  const [query, setQuery] = useState('');
  const [queryList, setQueryList] = useState<UserType[]>([]);
  const [selectedUser, setSelectedUser] = useState<string>('');
  const [inviteList, setInviteList] = useState<Array<Omit<UserType, 'id'>>>([]);
  const [emailList, setEmailList] = useState<string[]>([]);
  const getAutoComplete = useBindStore(state => state.getAutoComplete);
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
  };
  const onInviteClick: () => void = () => {
    setInviteList(inviteList => [...inviteList, { username: selectedUser, email: query }]);
    setEmailList(emailList => [...emailList, query]);
    setQuery('');
  };
  const { projectId } = useParams();
  const projectState = useSelector(selectProject);
  const projectInfo = useMemo(() => (
    projectState.find(project => project.id === parseInt(projectId ?? '0'))
  ), [projectId]);

  const onAddConfirmClicked = (): void => {
    console.log(emailList);
    setOpenAdd(false);
    setInviteList([]);
  };

  const onAddCancelClicked = (): void => {
    setOpenAdd(false);
    setInviteList([]);
  };

  const onDissolveConfirmClicked = (): void => {
    setOpenDissolve(false);
    setDissolve('');
  };

  const onDissolveCancelClicked = (): void => {
    setOpenDissolve(false);
    setDissolve('');
  };

  return (
    <>
      <div className="project-manage">
        <div className="project-info">{projectInfo?.name}: {projectInfo?.subject}: Contribution</div>
        <div className="settings-header">Project Management</div>
        <div className="team-members">
          <div className="team-members-title">
            Team Members
            <Button onClick={() => { setOpenAdd(true); }}>Add a new member</Button>
          </div>
          <List
            itemLayout="horizontal"
            dataSource={projectInfo?.members}
            renderItem={item => (
              <List.Item
                actions={[<a key="list-delete">delete</a>]}
              >
                <List.Item.Meta
                  avatar={<Avatar>{item.avatar}</Avatar>}
                  title={item.name}
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
          <Button danger onClick={() => { setOpenDissolve(true); }}>Dissolve Project</Button>
        </div>
      </div>
      <Modal
        open={openAdd}
        title={<div style={{ fontWeight: 'bold' }}>Add a new member</div>}
        onOk={onAddConfirmClicked}
        onCancel={onAddCancelClicked}
        footer={[
          <Button key="cancel" onClick={onAddCancelClicked}>Cancel</Button>,
          <Button type="primary" key="confirm" onClick={onAddConfirmClicked}>Confirm</Button>
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
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar>{item.username.substring(0, 1)}</Avatar>}
                    title={item.username}
                    description={item.email}
                  />
                </List.Item>
              )}
            />
          </div>
        </div>
      </Modal>
      <Modal
        open={openDissolve}
        title={<div style={{ fontWeight: 'bold' }}>Dissolve Project</div>}
        onOk={onAddConfirmClicked}
        onCancel={onAddCancelClicked}
        footer={[
          <Button key="cancel" onClick={onDissolveCancelClicked}>Cancel</Button>,
          <Button danger key="confirm" onClick={onDissolveConfirmClicked}>Dissolve</Button>
        ]}
        width={1000}
      >
        <div className="dissolve-container">
          <div className="dissolve-warning">Please read carefully. This work is irreversible.</div>
          <p className="dissolve-desc">This action <strong>cannot</strong> be undone. This will permanently delete the <strong>{projectInfo?.name}</strong> project, documents, schedules and every task infos.</p>
          <p className="dissolve-desc">This will not affect your status as member of Sprint. If you want to exit this project, you can be deleted by authorzied project members.</p>
          <p className="dissolve-desc">Please type <strong>{projectInfo?.name}</strong> to confirm.</p>
          <Input value={dissolve} onChange={(e) => { setDissolve(e.target.value); }} />
        </div>
      </Modal>
    </>
  );
};

export default ProjectManage;
