import useBindStore from '@store/zustand';
import { Modal, Table } from 'antd';
import { Key, SetStateAction, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface LinkModalProps {
  showLinkModal: boolean
  setShowLinkModal: React.Dispatch<SetStateAction<boolean>>
}

const documentSpaceColumns = [
  {
    title: 'Space Name',
    key: 'name',
    dataIndex: 'name'
  }
];

const LinkModal: React.FC<LinkModalProps> = ({ showLinkModal, setShowLinkModal }: LinkModalProps) => {
  const { projectId, taskId } = useParams();
  const documentSpaces = useBindStore(state => state.documentSpaces);
  const getDocumentSpaces = useBindStore(state => state.getDocumentSpaces);
  const linkDocumentSpace = useBindStore(state => state.linkDocumentSpace);
  const taskSpaces = useBindStore(state => state.taskSpaces);
  const getTaskSpaces = useBindStore(state => state.getTaskSpaces);
  const selectTask = useBindStore(state => state.selectTask);
  const [selectedSpaces, setSelectedSpaces] = useState<Key[]>([]);

  useEffect(() => {
    const getAsyncDocumentSpaces = async (): Promise<void> => {
      await getDocumentSpaces(parseInt(projectId ?? '0'));
      await getTaskSpaces(parseInt(taskId ?? '0'));
    };
    void getAsyncDocumentSpaces();
  }, [projectId, taskId]);

  useEffect(() => {
    setSelectedSpaces(taskSpaces.map(space => space.id));
  }, [taskSpaces]);

  const onOk = async (): Promise<void> => {
    const pTaskId = parseInt(taskId ?? '0');
    for (const space of taskSpaces) {
      await linkDocumentSpace(pTaskId, space.id, false);
    }
    for (const spaceId of selectedSpaces) {
      await linkDocumentSpace(pTaskId, spaceId as number, true);
    }
    await selectTask(pTaskId);
    setShowLinkModal(false);
  };

  return (
    <Modal
      title="Select document spaces to link with the task"
      open={showLinkModal}
      onOk={() => { void onOk(); }}
      onCancel={() => setShowLinkModal(false)}
    >
      <Table
        dataSource={documentSpaces.map(space => ({ ...space, key: space.id }))}
        columns={documentSpaceColumns}
        pagination={false}
        rowSelection={{
          type: 'checkbox',
          selectedRowKeys: selectedSpaces,
          onChange: (selectedRowKeys, _) => {
            setSelectedSpaces(selectedRowKeys);
          }
        }}
      />
    </Modal>
  );
};

export default LinkModal;
