import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import AWS from 'aws-sdk';
import { message, Table, Tag, Button, Collapse, Empty, Modal, Input } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import useBindStore from '@store/zustand';

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
  const { Panel } = Collapse;
  const { projectId } = useParams();
  const [tableData, setTableData] = useState<TableDataType[]>([]);
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
              <div className="space-header"><span /><Button>Change Head to Selected</Button></div>
              <Table rowSelection={{ type: 'radio', ...rowSelection }} dataSource={tableData} columns={columns} pagination={false}/>
              <br />
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
