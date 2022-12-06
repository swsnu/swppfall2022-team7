import { CheckOutlined } from '@ant-design/icons';
import { selectProject } from '@store/slices/project';
import { Table, Tag, Timeline } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

interface ContribTableDataType {
  key: React.Key
  hyun: boolean
  hun: boolean
  jin: boolean
  woo: boolean
  name: string
}

const _render = (q: boolean): JSX.Element => (
  <>
    {
      q ? <Tag color='geekblue'>Done</Tag> : <Tag color='volcano'>On Going</Tag>
    }
  </>
);

const columns: ColumnsType<ContribTableDataType> = [
  {
    title: 'Quest Name',
    dataIndex: 'questname',
    key: 'questname',
    render: (_: any, quest: ContribTableDataType) => (
      <div className="quest-name">{quest.name}</div>
    )
  },
  {
    title: 'SangHyun Yi',
    dataIndex: 'hyun',
    key: 'hyun',
    render: _render
  },
  {
    title: 'SangHun Kim',
    dataIndex: 'hun',
    key: 'hun',
    render: _render
  },
  {
    title: 'SeokWoo Choi',
    dataIndex: 'woo',
    key: 'woo',
    render: _render
  },
  {
    title: 'HyungJin Joo',
    dataIndex: 'jin',
    key: 'jin',
    render: _render
  }
];

const dummyData: ContribTableDataType[] = [
  {
    name: 'Compose a comment',
    hun: true,
    hyun: false,
    jin: true,
    woo: false,
    key: '0'
  },
  {
    name: 'Upload a document',
    hun: false,
    hyun: false,
    jin: true,
    woo: true,
    key: '1'
  },
  {
    name: 'React to a comment',
    hun: true,
    hyun: false,
    jin: true,
    woo: true,
    key: '2'
  },
  {
    name: 'Complete a task',
    hun: false,
    hyun: false,
    jin: true,
    woo: true,
    key: '3'
  }
];

const ProjectContribution: React.FC = () => {
  const { projectId } = useParams();
  const projectState = useSelector(selectProject);
  const projectInfo = useMemo(() => (
    projectState.find(project => project.id === parseInt(projectId ?? '0'))
  ), [projectId]);

  return (
    <div className="project-contrib">
      <div className="project-info">{projectInfo?.name}: {projectInfo?.subject}: Contribution</div>
      <div className="contrib-header">Contribution</div>
      <div className="quest-header">Project Quest</div>
      <Table dataSource={dummyData} columns={columns} pagination={false} />
      <div className="timeline-header">Project Timeline</div>
      <Timeline mode='left' pending='Loading...'>
        <Timeline.Item color="blue">
          <div className="timeline-time">Yesterday</div>
          <div className="timeline-content"><CheckOutlined />  SeokWoo commented on task &quot;write demo&quot;</div>
          <div className="timeline-content"><CheckOutlined />  SangHyun uploaded the file &quot;swpp_report.pdf&quot; for task &quot;swpp sprint report&quot;</div>
        </Timeline.Item>
        <Timeline.Item color="blue">
          <div className="timeline-time">Nov 6, 2022</div>
          <div className="timeline-content"><CheckOutlined />  SangHun created task &quot;swpp sprint report&quot;</div>
        </Timeline.Item>
        <Timeline.Item color="red">
          <div className="timeline-time">Oct 29, 2022</div>
          <div className="timeline-content"><CheckOutlined />  SangHyun&apos;s task &quot;Design and Planning&quot; expired</div>
          <div className="timeline-content"><CheckOutlined />  HyungJin created task &quot;new Design and Planning&quot; for the expired</div>
        </Timeline.Item>
      </Timeline>
    </div>
  );
};

export default ProjectContribution;
