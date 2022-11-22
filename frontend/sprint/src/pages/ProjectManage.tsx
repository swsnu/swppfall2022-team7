import { selectProject } from '@store/slices/project';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { List, Avatar, Button, Modal, AutoComplete, Input } from 'antd';
import AutoOption from '@components/AutoOption';
import { dummyMembers, MemberType } from '@utils/dummy';

const ProjectManage: React.FC = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const [openDissolve, setOpenDissolve] = useState(false);
  const [dissolve, setDissolve] = useState('');
  const [email, setEmail] = useState('');
  const [inviteList, setInviteList] = useState<MemberType[]>([]);
  const onInviteClick: () => void = () => {
    const invite = dummyMembers.find(member => member.email === email);
    if (invite === undefined) return;
    setInviteList(inviteList => [...inviteList, invite]);
    setEmail('');
  };
  const { projectId } = useParams();
  const projectState = useSelector(selectProject);
  const projectInfo = useMemo(() => (
    projectState.find(project => project.id === parseInt(projectId ?? '0'))
  ), [projectId]);

  const onAddConfirmClicked = (): void => {
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
