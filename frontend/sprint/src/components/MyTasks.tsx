import { selectProject } from '@store/slices/project';
import { Badge, List, Tabs } from 'antd';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

interface MyTaskType {
  task: string
  project: string
  status: 'current' | 'new' | 'ongoing'
  taskId: number
  projectId: number
}

const MyTasks: React.FC = () => {
  const projectState = useSelector(selectProject);
  const navigate = useNavigate();
  const myTasks: MyTaskType[] = [];
  projectState.forEach(project => {
    project.tasks.forEach(task => {
      task.members.forEach(member => {
        if (member.email === 'poding84@snu.ac.kr') {
          myTasks.push({
            task: task.name,
            project: project.name,
            status: 'ongoing',
            taskId: task.id,
            projectId: project.id
          });
        }
      });
    });
  });
  return (
    <Tabs
      style={{
        paddingBottom: 20
      }}
      defaultActiveKey="ongoing"
      items={[
        {
          label: <span>Ongoing&nbsp;<Badge count={myTasks.length}/></span>,
          key: 'ongoing',
          children: (
            <List
              dataSource={myTasks}
              renderItem={(item, i) => (
                <List.Item key={i} className="my-task-list" onClick={() => navigate(`/projects/${item.projectId}/tasks/${item.taskId}`)}>
                  <List.Item.Meta
                    title={item.task}
                    description={item.project}
                  />
                  <div>{item.status}</div>
                </List.Item>
              )}
            />
          )
        },
        {
          label: 'Done',
          key: 'done',
          children: null
        }
      ]}
    />
  );
};

export default MyTasks;
