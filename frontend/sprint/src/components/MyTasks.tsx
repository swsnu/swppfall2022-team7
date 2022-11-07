import { selectProject } from '@store/slices/project';
import { Badge, List, Tabs, Tag } from 'antd';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

interface MyTaskType {
  task: string
  project: string
  status: string
  taskId: number
  projectId: number
  dueDate: string
}

const MyTasks: React.FC = () => {
  const projectState = useSelector(selectProject);
  const navigate = useNavigate();
  const onGoingTasks: MyTaskType[] = [];
  const doneTasks: MyTaskType[] = [];
  projectState.forEach(project => {
    project.tasks.forEach(task => {
      task.members.forEach(member => {
        if (member.email === 'poding84@snu.ac.kr') {
          if (task.status === 'done') {
            doneTasks.push({
              task: task.name,
              project: project.name,
              status: task.status,
              taskId: task.id,
              projectId: project.id,
              dueDate: task.dueDate
            });
          } else {
            onGoingTasks.push({
              task: task.name,
              project: project.name,
              status: task.status,
              taskId: task.id,
              projectId: project.id,
              dueDate: task.dueDate
            });
          }
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
          label: <span>Ongoing&nbsp;<Badge count={onGoingTasks.length}/></span>,
          key: 'ongoing',
          children: (
            <List
              dataSource={onGoingTasks}
              renderItem={(item, i) => (
                <List.Item key={i} className="my-task-list" onClick={() => navigate(`/projects/${item.projectId}/tasks/${item.taskId}`)}>
                  <List.Item.Meta
                    title={item.task}
                    description={item.project}
                  />
                  <>
                    <Tag color='volcano'>On Going</Tag>
                    {item.dueDate}
                  </>
                </List.Item>
              )}
            />
          )
        },
        {
          label: <span>Done&nbsp;<Badge count={doneTasks.length}/></span>,
          key: 'done',
          children: (
            <List
              dataSource={doneTasks}
              renderItem={(item, i) => (
                <List.Item key={i} className="my-task-list" onClick={() => navigate(`/projects/${item.projectId}/tasks/${item.taskId}`)}>
                  <List.Item.Meta
                    title={item.task}
                    description={item.project}
                  />
                  <>
                    <Tag color='geekblue'>Done</Tag>
                    {item.dueDate}
                  </>
                </List.Item>
              )}
            />
          )
        }
      ]}
    />
  );
};

export default MyTasks;
