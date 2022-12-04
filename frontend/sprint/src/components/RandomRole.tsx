import useBindStore from '@store/zustand';
import { Modal, Table } from 'antd';
import { Dispatch, Key, SetStateAction, useState } from 'react';

interface RandomRoleProps {
  randomIdList: Key[]
  setRandomIdList: Dispatch<SetStateAction<Key[]>>
  showModal: boolean
  setShowModal: Dispatch<SetStateAction<boolean>>
}

const memberColumns = [
  {
    title: 'Name',
    key: 'username',
    dataIndex: 'username'
  },
  {
    title: 'Email',
    key: 'email',
    dataIndex: 'email'
  }
];

const RandomRole: React.FC<RandomRoleProps> = ({ randomIdList, setRandomIdList, showModal, setShowModal }: RandomRoleProps) => {
  const project = useBindStore(state => state.selectedProject);
  const selectProject = useBindStore(state => state.selectProject);
  const randomAssign = useBindStore(state => state.randomAssign);
  const [selectedList, setSelectedList] = useState<Key[]>();
  const onCancel: () => void = () => {
    setSelectedList([]);
    setShowModal(false);
  };
  const onOk: () => Promise<void> = async () => {
    await randomAssign(randomIdList as number[], selectedList as number[]);
    if (project !== null) await selectProject(project.id);
    setRandomIdList([]);
    setSelectedList([]);
    setShowModal(false);
  };
  return (
    <Modal title="Random Role Assignment" open={showModal} onCancel={onCancel} onOk={() => { void onOk(); }} okText="Assign" okButtonProps={{ disabled: (selectedList?.length ?? 0) < randomIdList.length }}>
      Select at least {randomIdList.length} members to assign tasks randomly.
      <Table
        dataSource={project?.member_list?.map(member => ({ ...member, key: member.id }))}
        columns={memberColumns}
        pagination={false}
        rowSelection={{
          type: 'checkbox',
          onChange: (selectedRowKeys, _) => {
            setSelectedList(selectedRowKeys);
          },
          selectedRowKeys: selectedList
        }}
      />
    </Modal>
  );
};

export default RandomRole;
