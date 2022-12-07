import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Button, Collapse, Empty, Modal, Input } from 'antd';
import useBindStore from '@store/zustand';
import DocumentPanel from '@components/DocumentPanel';

const ProjectDocument: React.FC = () => {
  const { Panel } = Collapse;
  const { projectId } = useParams();
  const [showAddModal, setShowAddModal] = useState(false);
  const [spaceName, setSpaceName] = useState('');
  const project = useBindStore(state => state.selectedProject);
  const documentSpaces = useBindStore(state => state.documentSpaces);
  const getDocumentSpaces = useBindStore(state => state.getDocumentSpaces);
  const addDocumentSpace = useBindStore(state => state.addDocumentSpace);

  const onOk = async (): Promise<void> => {
    await addDocumentSpace(parseInt(projectId ?? '0'), spaceName);
    await getDocumentSpaces(parseInt(projectId ?? '0'));
    setShowAddModal(false);
    setSpaceName('');
  };

  const onKeyPress = (e: React.KeyboardEvent<HTMLElement>): void => {
    if (e.key === 'Enter') {
      void onOk();
    }
  };

  useEffect(() => {
    if (projectId === undefined) return;
    const getAsyncDocumentSpaces = async (): Promise<void> => {
      await getDocumentSpaces(parseInt(projectId));
    };
    void getAsyncDocumentSpaces();
  }, [projectId]);

  return (
    <>
      <div className="project-document">
        <div className="project-info">{project?.name}: {project?.subject}: Documents</div>
        <div className="project-header">
          Document Spaces
          <Button type="primary" onClick={() => setShowAddModal(true)}>Add Space</Button>
        </div>
        {documentSpaces.length > 0 && <Collapse>
          {documentSpaces.map(documentSpace => (
            <Panel header={documentSpace.name} key={documentSpace.id}>
              <DocumentPanel documentSpace={documentSpace} />
            </Panel>
          ))}
        </Collapse>}
        {documentSpaces.length === 0 && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} className="empty-cell" />}
      </div>
      <Modal
        title="Add Document Space"
        open={showAddModal}
        onCancel={() => setShowAddModal(false)}
        okButtonProps={{ disabled: spaceName.length === 0 }}
        onOk={() => { void onOk(); }}
      >
        <Input placeholder="Space name" value={spaceName} onChange={e => setSpaceName(e.target.value)} onKeyPress={onKeyPress} />
      </Modal>
    </>
  );
};

export default ProjectDocument;
