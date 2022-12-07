import { InboxOutlined, StarOutlined } from '@ant-design/icons';
import { DocumentSpaceCardType } from '@store/zustand/project';
import { Button, Collapse, Empty, message, Upload, UploadFile, UploadProps } from 'antd';
import AWS from 'aws-sdk';
import { useState, useEffect } from 'react';
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

  AWS.config.region = 'ap-northeast-2';
  AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'ap-northeast-2:89dcba84-b66a-49ce-b1f1-c0a3e77dd9da'
  });
  const s3 = new AWS.S3();

  useEffect(() => {
    s3.getSignedUrl('getObject', {
      Bucket: 'swppsprint',
      Key: 'asdf',
      Expires: 604799,
      ResponseContentDisposition: 'attachment; filename ="asdf"'
    });
  }, []);

  useEffect(() => {
    s3?.listObjects({ Bucket: 'swppsprint', Prefix: '1_1/' }, (e, d) => {
      if (e != null) void message.error('error during fetching document list');
      const newList: DocumentType[] = [];
      d.Contents?.forEach(file => {
        const url = s3.getSignedUrl('getObject', {
          Bucket: 'swppsprint',
          Key: file.Key,
          Expires: 604799,
          ResponseContentDisposition: `attachment; filename ="${file.Key ?? 'asdf.txt'}"`
        });
        newList.unshift({ key: file.Key, time: file.LastModified, url });
        setFileList([...newList]);
      });
    });
  }, []);

  const props: UploadProps = {
    onRemove: file => {
      const index = uploadFile.indexOf(file);
      const newFileList = uploadFile.slice();
      newFileList.splice(index, 1);
      setUploadFile(newFileList);
    },
    beforeUpload: file => {
      setUploadFile([...uploadFile, file]);
      return false;
    },
    fileList: uploadFile
  };

  const uploadAWS = async (): Promise<void> => {
    for (const file of uploadFile) {
      const upload = new AWS.S3.ManagedUpload({
        params: {
          Bucket: 'swppsprint',
          Key: '1_1/' + file.name,
          Body: uploadFile[0]
        }
      });
      await upload.promise()
        .then(() => {
          const url = s3.getSignedUrl('getObject', {
            Bucket: 'swppsprint',
            Key: '1_1/' + file.name,
            Expires: 604799,
            ResponseContentDisposition: `attachment; filename ="${'1_1/' + file.name ?? 'asdf.txt'}"`
          });
          setFileList([{ key: file.name, time: file.lastModifiedDate, url }, ...fileList]);
        });
    };
  };

  const handleUpload2 = async (): Promise<void> => {
    await uploadAWS().then(() => {
      setUploadFile([]);
      setUploading(false);
    });
  };

  const handleUpload = (): void => {
    setUploading(true);
    void handleUpload2();
  };
  return (
    <>
      <div className="documents-container">
        <div className="document-header">
          Task Documents
          <Button size="small" onClick={() => setShowLinkModal(true)}>Link Space</Button>
        </div>
        {documentSpaces.map(documentSpace => (
          <Collapse accordion key={documentSpace.id}>
            <Panel header={documentSpace.name} key={documentSpace.id}>
              <div className="document-container">
                <div className="document-left">
                  {fileList.map((file, i) => {
                    return (
                      <a href={file.url} className="document-uploaded" key={file.key}>
                        <div className="file-name-container">
                          <div className="uploaded-file">{file.key}</div>
                          {(i === 0) && <StarOutlined size={10} />}
                        </div>
                        <div className="file-info">
                          <div className="uploaded-time">{file.time?.toISOString().substring(0, 10)}</div>
                          <div className="file-uploader">SangHyun Yi</div>
                        </div>
                      </a>
                    );
                  })}
                </div>
                <div className="document-right">
                  <Dragger {...props}>
                    <p className="ant-upload-drag-icon">
                      <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Click or drag file for upload</p>
                    <p className="ant-upload-hint">
                      Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                      band files
                    </p>
                  </Dragger>
                </div>
              </div>
              <div className="doc-button-tab">
                <Button className="document-confirm" onClick={handleUpload} disabled={uploadFile.length === 0} loading={uploading} size='small'>
                  Upload
                </Button>
              </div>
            </Panel>
          </Collapse>
        ))}
        {documentSpaces.length === 0 && <Empty className="empty-cell" image={Empty.PRESENTED_IMAGE_SIMPLE} />}
      </div>
      <LinkModal showLinkModal={showLinkModal} setShowLinkModal={setShowLinkModal} />
    </>
  );
};

export default DocSpaceCollapse;
