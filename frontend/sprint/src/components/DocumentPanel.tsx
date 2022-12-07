import useBindStore from '@store/zustand';
import { DocumentSpaceType } from '@store/zustand/documentSpace';
import { Button, message, Table, Tag } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import AWS from 'aws-sdk';
import { useEffect, useState } from 'react';

interface DocumentPanelProps {
  documentSpace: DocumentSpaceType
}

interface TableDataType {
  key: React.Key
  filename: string
  lastmodified: string
  uploader: string
  head: boolean
  url: string
}

const columns: ColumnsType<TableDataType> = [
  {
    title: 'File Name',
    dataIndex: 'filename',
    key: 'filename',
    render: (_: any, record: TableDataType) => (
      <a href={record.url}>{record.filename}</a>
    )
  },
  {
    title: 'Last Modified',
    dataIndex: 'lastmodified',
    key: 'lastmodified'
  },
  {
    title: 'Uploader',
    dataIndex: 'uploader',
    key: 'uploader'
  },
  {
    title: 'Head',
    dataIndex: 'head',
    key: 'head',
    render: (_, { head }) => (
      <>
        {head &&
          <Tag color='geekblue'>
            HEAD
          </Tag>
        }
      </>
    )
  }
];

const DocumentPanel: React.FC<DocumentPanelProps> = ({ documentSpace }: DocumentPanelProps) => {
  const [tableData, setTableData] = useState<TableDataType[]>([]);
  const [nextHead, setNextHead] = useState<number>(documentSpace.head);
  const [changingHead, setChangingHead] = useState(false);
  const getUserName = useBindStore(state => state.getUserName);
  const changeDocumentSpaceHead = useBindStore(state => state.changeDocumentSpaceHead);
  const rowSelection = {
    getCheckboxProps: (record: TableDataType) => ({
      disabled: record.head
    }),
    onChange: (selectedRowKeys: React.Key[], _: TableDataType[]) => {
      const fileName = selectedRowKeys[0] as string;
      const fileId = fileName.split(/[/,_]/)[2];
      setNextHead(parseInt(fileId ?? '0'));
    }
  };
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
    s3?.listObjects({ Bucket: 'swppsprint', Prefix: `${documentSpace.id}/` }, (error, data) => {
      if (error != null) void message.error('error during fetching document list');
      const newList: TableDataType[] = [];
      const setFile = async (): Promise<void> => {
        if (data.Contents === undefined) return;
        for (const file of data.Contents) {
          const url = s3.getSignedUrl('getObject', {
            Bucket: 'swppsprint',
            Key: file.Key,
            Expires: 604799,
            ResponseContentDisposition: `attachment; filename ="${file.Key ?? 'asdf.txt'}"`
          });
          const parsedUserId = file.Key?.split(/[/,_]/)[1];
          const parsedDocId = file.Key?.split(/[/,_]/)[2];
          const fileUploader = await getUserName(parsedUserId ?? '0');
          newList.unshift({
            key: file.Key ?? 'undefined',
            filename: file.Key ?? 'undefined',
            url,
            head: parseInt(parsedDocId ?? '0') === documentSpace.head,
            lastmodified: file.LastModified?.toISOString().replace('T', ' ').replace('Z', '') ?? 'undefined',
            uploader: fileUploader
          });
          setTableData(newList);
        }
      };
      void setFile();
    });
  }, [changingHead]);

  const onClickChangeHead = async (): Promise<void> => {
    setChangingHead(true);
    await changeDocumentSpaceHead(documentSpace.id, nextHead);
    setChangingHead(false);
  };

  return (
    <>
      <div className="space-header"><span />
        <Button
          disabled={documentSpace.head === nextHead}
          onClick={() => { void onClickChangeHead(); }}
          loading={changingHead}
        >
            Change Head to Selected
          </Button>
      </div>
      <Table rowSelection={{ type: 'radio', ...rowSelection }} dataSource={tableData} columns={columns} pagination={false} />
      <br />
    </>
  );
};

export default DocumentPanel;
