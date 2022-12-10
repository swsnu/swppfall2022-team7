import { DocumentSpaceCardType } from '@store/zustand/project';
import { Button, Empty } from 'antd';
import { useState } from 'react';
import DocUploader from './DocUploader';
import LinkModal from './LinkModal';

interface DocSpaceCollapseProps {
  documentSpaces: DocumentSpaceCardType[]
}

const DocSpaceCollapse: React.FC<DocSpaceCollapseProps> = ({ documentSpaces }: DocSpaceCollapseProps) => {
  const [showLinkModal, setShowLinkModal] = useState(false);

  return (
    <>
      <div className="documents-container">
        <div className="document-header">
          Task Documents
          <Button size="small" onClick={() => setShowLinkModal(true)}>Link Space</Button>
        </div>
        {documentSpaces.map(documentSpace => (
          <DocUploader key={documentSpace.id} documentSpace={documentSpace} />
        ))}
        {documentSpaces.length === 0 && <Empty className="empty-cell" image={Empty.PRESENTED_IMAGE_SIMPLE} />}
      </div>
      <LinkModal showLinkModal={showLinkModal} setShowLinkModal={setShowLinkModal} />
    </>
  );
};

export default DocSpaceCollapse;
