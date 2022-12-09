import { InboxOutlined, StarOutlined } from '@ant-design/icons';
import useBindStore from '@store/zustand';
import { DocumentSpaceCardType } from '@store/zustand/project';
import { Button, Collapse, Empty, message, Upload, UploadFile, UploadProps } from 'antd';
import AWS from 'aws-sdk';
import { useState, useEffect } from 'react';
import DocUploader from './DocUploader';
import LinkModal from './LinkModal';

interface DocumentType {
  key: string | undefined
  time: Date | undefined
  url: string
}

interface DocSpaceCollapseProps {
  documentSpaces: DocumentSpaceCardType[]
}

const DocSpaceCollapse: React.FC<DocSpaceCollapseProps> = ({ documentSpaces }: DocSpaceCollapseProps) => {
  const { Dragger } = Upload;
  const { Panel } = Collapse;

  const [uploadFile, setUploadFile] = useState<UploadFile[]>([]);
  const [fileList, setFileList] = useState<DocumentType[]>([]);
  const [uploading, setUploading] = useState(false);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const getNewDocumentId = useBindStore(state => state.getNewDocumentId);

  // AWS.config.region = 'ap-northeast-2';
  // AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  //   IdentityPoolId: 'ap-northeast-2:89dcba84-b66a-49ce-b1f1-c0a3e77dd9da'
  // });
  // const s3 = new AWS.S3();

  // useEffect(() => {
  //   s3.getSignedUrl('getObject', {
  //     Bucket: 'swppsprint',
  //     Key: 'asdf',
  //     Expires: 604799,
  //     ResponseContentDisposition: 'attachment; filename ="asdf"'
  //   });
  // }, []);

  // useEffect(() => {
  //   s3?.listObjects({ Bucket: 'swppsprint' }, (error, data) => {
  //     if (error != null) void message.error('error during fetching document list');
  //     const newList: DocumentType[] = [];
  //     data.Contents?.forEach(file => {
  //       const url = s3.getSignedUrl('getObject', {
  //         Bucket: 'swppsprint',
  //         Key: file.Key,
  //         Expires: 604799,
  //         ResponseContentDisposition: `attachment; filename ="${file.Key ?? 'asdf.txt'}"`
  //       });
  //       newList.unshift({ key: file.Key, time: file.LastModified, url });
  //       setFileList([...newList]);
  //     });
  //   });
  // }, []);

  // const spaceDocumentList = (spaceId: number): DocumentType[] => {
  //   const spaceDocList: DocumentType[] = [];
  //   s3?.listObjects({ Bucket: 'swppsprint', Prefix: `${String(spaceId)}/` }, (error, data) => {
  //     if (error != null) void message.error('error during fetching document list');
  //     data.Contents?.forEach(file => {
  //       const url = s3.getSignedUrl('getObject', {
  //         Bucket: 'swppsprint',
  //         Key: file.Key,
  //         Expires: 604799,
  //         ResponseContentDisposition: `attachment; filename ="${file.Key ?? 'asdf.txt'}"`
  //       });
  //       spaceDocList.unshift({ key: file.Key, time: file.LastModified, url });
  //     });
  //   });
  //   return spaceDocList;
  // };

  // const props: UploadProps = {
  //   onRemove: file => {
  //     const index = uploadFile.indexOf(file);
  //     const newFileList = uploadFile.slice();
  //     newFileList.splice(index, 1);
  //     setUploadFile(newFileList);
  //   },
  //   beforeUpload: file => {
  //     setUploadFile([...uploadFile, file]);
  //     return false;
  //   },
  //   fileList: uploadFile
  // };

  // const uploadAWS = async (spaceId: number, newDocumentId: number): Promise<void> => {
  //   for (const file of uploadFile) {
  //     const fileKey = String(spaceId) + '/' + String(newDocumentId) + '_' + file.name;
  //     const upload = new AWS.S3.ManagedUpload({
  //       params: {
  //         Bucket: 'swppsprint',
  //         Key: fileKey,
  //         Body: uploadFile[0]
  //       }
  //     });
  //     await upload.promise()
  //       .then(() => {
  //         const url = s3.getSignedUrl('getObject', {
  //           Bucket: 'swppsprint',
  //           Key: fileKey,
  //           Expires: 604799,
  //           ResponseContentDisposition: `attachment; filename ="${fileKey ?? 'asdf.txt'}"`
  //         });
  //         setFileList([{ key: file.name, time: file.lastModifiedDate, url }, ...fileList]);
  //       });
  //   };
  // };

  // const handleUpload2 = async (spaceId: number): Promise<void> => {
  //   const newDocumentId = await getNewDocumentId(spaceId);
  //   await uploadAWS(spaceId, newDocumentId).then(() => {
  //     setUploadFile([]);
  //     setUploading(false);
  //   });
  // };

  // const handleUpload = (spaceId: number): void => {
  //   setUploading(true);
  //   void handleUpload2(spaceId);
  // };
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
