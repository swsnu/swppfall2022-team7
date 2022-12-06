import { CheckOutlined } from '@ant-design/icons';
import useBindStore from '@store/zustand';
import { QuestContribType } from '@store/zustand/contribution';
import { Table, Tag, Timeline } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useEffect } from 'react';
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

const contribTag = (status: 'Done' | 'On Going'): JSX.Element => (
  <Tag color={status === 'Done' ? 'geekblue' : 'volcano'}>{status}</Tag>
);

const contribColumns = [
  {
    title: 'Participant',
    dataIndex: 'user',
    key: 'user',
    render: (_: any, userContrib: QuestContribType) => (
      <div>{userContrib.user.username}</div>
    )
  },
  {
    title: 'Complete a task',
    dataIndex: 'task',
    key: 'task',
    render: (_: any, userContrib: QuestContribType) => contribTag(userContrib.board['Complete a task'])
  },
  {
    title: 'Write a comment',
    dataIndex: 'c_comment',
    key: 'c_comment',
    render: (_: any, userContrib: QuestContribType) => contribTag(userContrib.board['Compose a comment'])
  },
  {
    title: 'React to a comment',
    dataIndex: 'r_comment',
    key: 'r_comment',
    render: (_: any, userContrib: QuestContribType) => contribTag(userContrib.board['React to a comment'])
  },
  {
    title: 'Upload a document',
    dataIndex: 'document',
    key: 'document',
    render: (_: any, userContrib: QuestContribType) => contribTag(userContrib.board['Upload a document'])
  }
];

const ProjectContribution: React.FC = () => {
  const { projectId } = useParams();
  const project = useBindStore(state => state.selectedProject);
  const quest = useBindStore(state => state.quest);
  const timeline = useBindStore(state => state.timeline);
  const getQuest = useBindStore(state => state.getQuest);
  const getTimeline = useBindStore(state => state.getTimeline);

  useEffect(() => {
    const getAsyncContrib = async (): Promise<void> => {
      await getQuest(parseInt(projectId ?? '0'));
      await getTimeline(parseInt(projectId ?? '0'));
    };
    void getAsyncContrib();
  }, [projectId]);

  return (
    <div className="project-contrib">
      <div className="project-info">{project?.name}: {project?.subject}: Contribution</div>
      <div className="contrib-header">Contribution</div>
      <div className="quest-header">Project Quest</div>
      <Table dataSource={quest} columns={contribColumns} pagination={false} />
      <div className="timeline-header">Project Timeline</div>
      <Timeline mode='left'>
        {timeline.map(contrib => (
          <Timeline.Item color="blue" key={contrib.date_str}>
            <div className="timeline-time">{contrib.date_str}</div>
            {contrib.logs.map(log => (
              <div className="timeline-content" key={log.created_at}>
                <CheckOutlined className="bullet" />
                <span dangerouslySetInnerHTML={{ __html: log.message }} />
              </div>
            ))}
          </Timeline.Item>
        ))}
      </Timeline>
    </div>
  );
};

export default ProjectContribution;
