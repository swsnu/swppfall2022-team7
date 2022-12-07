import useBindStore from '@store/zustand';
import { DocumentSpaceType } from '@store/zustand/documentSpace';
import { Button, Collapse, message, Table, Tag } from 'antd';
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
  head: string[]
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
        {head.map(tag => {
          return (
            <Tag color='geekblue' key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    )
  }
];

const DocumentPanel: React.FC<DocumentPanelProps> = ({ documentSpace }: DocumentPanelProps) => {
  const { Panel } = Collapse;
  const [tableData, setTableData] = useState<TableDataType[]>([]);
  const getUserName = useBindStore(state => state.getUserName);
  const rowSelection = {
    getCheckboxProps: (record: TableDataType) => ({
      disabled: record.head.length === 1
    })
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
          const fileUploader = await getUserName(parsedUserId ?? '0');
          newList.unshift({
            key: file.Key ?? 'undefined',
            filename: file.Key ?? 'undefined',
            url,
            head: [],
            lastmodified: file.LastModified?.toISOString().replace('T', ' ').replace('Z', '') ?? 'undefined',
            uploader: fileUploader
          });
          setTableData(newList);
        }
      };
      void setFile();
    });
  }, []);

  return (
    <>
      <div className="space-header"><span /><Button>Change Head to Selected</Button></div>
      <Table rowSelection={{ type: 'radio', ...rowSelection }} dataSource={tableData} columns={columns} pagination={false}/>
      <br />
    </>
  );
};

export default DocumentPanel;
