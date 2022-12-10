import { InboxOutlined, StarOutlined } from '@ant-design/icons';
import { Button, Collapse, message, Upload, UploadFile, UploadProps } from 'antd';
import { useEffect, useState } from 'react';
import AWS from 'aws-sdk';
import useBindStore from '@store/zustand';
import { DocumentSpaceCardType } from '@store/zustand/project';
import { parseDocId, parseUserId } from '@utils/utils';

interface DocUploaderProps {
  documentSpace: DocumentSpaceCardType
}

interface DocumentType {
  key: string | undefined
  time: Date | undefined
  url: string
  uploader: string
}

const DocUploader: React.FC<DocUploaderProps> = ({ documentSpace }: DocUploaderProps) => {
  const { Panel } = Collapse;
  const { Dragger } = Upload;
  const [fileList, setFileList] = useState<DocumentType[]>([]);
  const [uploadFile, setUploadFile] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const user = useBindStore(state => state.user);
  const getNewDocumentId = useBindStore(state => state.getNewDocumentId);
  const getUserName = useBindStore(state => state.getUserName);

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

  useEffect(() => {
    s3?.listObjects({ Bucket: 'swppsprint', Prefix: `${documentSpace.id}/` }, (error, data) => {
      if (error != null) void message.error('error during fetching document list');
      const newList: DocumentType[] = [];
      const setFile = async (): Promise<void> => {
        if (data.Contents === undefined) return;
        for (const file of data.Contents) {
          const url = s3.getSignedUrl('getObject', {
            Bucket: 'swppsprint',
            Key: file.Key,
            Expires: 604799,
            ResponseContentDisposition: `attachment; filename ="${file.Key ?? 'asdf.txt'}"`
          });
          const parsedUserId = parseUserId(file.Key ?? '');
          const fileUploader = await getUserName(parsedUserId ?? '0');
          newList.unshift({ key: file.Key, time: file.LastModified, url, uploader: fileUploader });
        }
        setFileList([...newList]);
      };
      void setFile();
    });
  }, [uploading]);

  const uploadAWS = async (spaceId: number, newDocumentId: number): Promise<void> => {
    for (const file of uploadFile) {
      const fileKey = String(spaceId) + '/' + String(user?.id) + '_' + String(newDocumentId) + '_' + file.name;
      const upload = new AWS.S3.ManagedUpload({
        params: {
          Bucket: 'swppsprint',
          Key: fileKey,
          Body: uploadFile[0]
        }
      });
      await upload.promise();
    };
  };

  const handleUploadWithId = async (spaceId: number): Promise<void> => {
    const newDocumentId = await getNewDocumentId(spaceId);
    await uploadAWS(spaceId, newDocumentId).then(() => {
      setUploadFile([]);
      setUploading(false);
    });
  };

  const handleUpload = (spaceId: number): void => {
    setUploading(true);
    void handleUploadWithId(spaceId);
  };

  return (
    <Collapse accordion key={documentSpace.id}>
      <Panel header={documentSpace.name} key={documentSpace.id}>
        <div className="document-container">
          <div className="document-left">
            {fileList.map((file) => {
              const fileId = parseDocId(file.key ?? '');
              return (
                <a href={file.url} className="document-uploaded" key={file.key}>
                  <div className="file-name-container">
                    <div className="uploaded-file">{file.key}</div>
                    {(parseInt(fileId ?? '0') === documentSpace.head) && <StarOutlined size={10} />}
                  </div>
                  <div className="file-info">
                    <div className="uploaded-time">{file.time?.toISOString().substring(0, 10)}</div>
                    <div className="file-uploader">{file.uploader}</div>
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
          <Button className="document-confirm" onClick={() => handleUpload(documentSpace.id)} disabled={uploadFile.length === 0} loading={uploading} size='small'>
            Upload
          </Button>
        </div>
      </Panel>
    </Collapse>
  );
};

export default DocUploader;
