import { useSelector } from 'react-redux';
import { selectProject } from '@store/slices/project';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import AWS from 'aws-sdk';
import { message, Table, Tag, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface TableDataType {
  key: React.Key
  filename: string
  lastmodified: string
  uploader: string
  description: string
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
    title: 'Description',
    dataIndex: 'description',
    key: 'description'
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

const ProjectDocument: React.FC = () => {
  const projectState = useSelector(selectProject);
  const { projectId } = useParams();
  const project = projectState.find(project => project.id === parseInt(projectId ?? '0'));
  const [tableData, setTableData] = useState<TableDataType[]>([]);

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
    s3?.listObjects({ Bucket: 'swppsprint' }, (e, d) => {
      if (e != null) void message.error('error during fetching document list');
      const newList: TableDataType[] = [];
      d.Contents?.forEach((file, i) => {
        const url = s3.getSignedUrl('getObject', {
          Bucket: 'swppsprint',
          Key: file.Key,
          Expires: 604799,
          ResponseContentDisposition: `attachment; filename ="${file.Key ?? 'asdf.txt'}"`
        });
        newList.unshift({
          key: file.Key ?? 'undefined',
          filename: file.Key ?? 'undefined',
          description: `write ${file.Key ?? 'undefined'}`,
          url,
          head: (i === (d.Contents?.length ?? 1) - 1) ? ['head'] : [],
          lastmodified: file.LastModified?.toISOString().replace('T', ' ').replace('Z', '') ?? 'undefined',
          uploader: 'SangHyun Yi'
        });
        setTableData([...newList]);
      });
    });
  }, []);

  const rowSelection = {
    getCheckboxProps: (record: TableDataType) => ({
      disabled: record.head.length === 1
    })
  };

  return (
    <div className="project-document">
      <div className="project-info">{project?.name}: {project?.subject}: documents</div>
      <div className="project-header">Document Spaces</div>
      <div className="space-header">Thousands of Brains Summary<Button>Change Head to Selected</Button></div>
      <Table rowSelection={{ type: 'radio', ...rowSelection }} dataSource={tableData} columns={columns} pagination={false}/>
    </div>
  );
};

export default ProjectDocument;
