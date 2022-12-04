import useBindStore from '@store/zustand';
import { Badge, List, Tabs, Tag } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { TaskType } from '@store/zustand/task';

const MyTasks: React.FC = () => {
  const userTasks = useBindStore(state => state.userTasks);
  const getUserTasks = useBindStore(state => state.getUserTasks);
  useEffect(() => {
    const getAsyncUserTasks = async (): Promise<void> => {
      const userId = localStorage.getItem('userId');
      if (userId !== null) await getUserTasks(userId);
    };
    void getAsyncUserTasks();
  }, []);
  const navigate = useNavigate();
  const onGoingTasks: TaskType[] = [];
  const doneTasks: TaskType[] = [];
  for (const task of userTasks) {
    if (task.status === 'on-going') onGoingTasks.push(task);
    else doneTasks.push(task);
  }
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
                <List.Item key={i} className="my-task-list" onClick={() => navigate(`/projects/${item.project}/tasks/${item.id}`)}>
                  <List.Item.Meta
                    title={item.name}
                    description={item.project}
                  />
                  <>
                    <Tag color='volcano'>On Going</Tag>
                    {item.untilAt}
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
                <List.Item key={i} className="my-task-list" onClick={() => navigate(`/projects/${item.project}/tasks/${item.id}`)}>
                  <List.Item.Meta
                    title={item.name}
                    description={item.project}
                  />
                  <>
                    <Tag color='geekblue'>Done</Tag>
                    {item.untilAt}
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
