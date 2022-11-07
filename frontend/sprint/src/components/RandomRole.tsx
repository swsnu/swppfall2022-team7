import { AppDispatch } from '@store/index';
import { projectActions, selectProject } from '@store/slices/project';
import { Modal, Table } from 'antd';
import { Dispatch, Key, SetStateAction, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

interface RandomRoleProps {
  randomIdList: Key[]
  setRandomIdList: Dispatch<SetStateAction<Key[]>>
  showModal: boolean
  setShowModal: Dispatch<SetStateAction<boolean>>
}

const memberColumns = [
  {
    title: 'Name',
    key: 'name',
    dataIndex: 'name'
  },
  {
    title: 'Email',
    key: 'email',
    dataIndex: 'email'
  }
];

const RandomRole: React.FC<RandomRoleProps> = ({ randomIdList, setRandomIdList, showModal, setShowModal }: RandomRoleProps) => {
  const projectState = useSelector(selectProject);
  const dispatch = useDispatch<AppDispatch>();
  const { projectId } = useParams();
  const memberList = projectState.find(project => project.id === parseInt(projectId ?? '0'))?.members;
  const [selectedList, setSelectedList] = useState<Key[]>();
  const onCancel: () => void = () => {
    setSelectedList([]);
    setShowModal(false);
  };
  const onOk: () => void = () => {
    dispatch(projectActions.randomAssign({ projectId: parseInt(projectId ?? '0'), taskList: randomIdList as number[], memberList: selectedList as number[] }));
    setRandomIdList([]);
    setSelectedList([]);
    setShowModal(false);
  };
  return (
    <Modal title="Random Role Assignment" open={showModal} onCancel={onCancel} onOk={onOk} okText="Assign" okButtonProps={{ disabled: (selectedList?.length ?? 0) < randomIdList.length }}>
      Select at least {randomIdList.length} members to assign tasks randomly.
      <Table
        dataSource={memberList?.map(member => ({ ...member, key: member.id }))}
        columns={memberColumns}
        pagination={false}
        rowSelection={{
          type: 'checkbox',
          onChange: (selectedRowKeys, selectedRows) => {
            setSelectedList(selectedRowKeys);
          },
          selectedRowKeys: selectedList
        }}
      />
    </Modal>
  );
};

export default RandomRole;
