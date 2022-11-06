import { selectProject } from '@store/slices/project';
import { Badge, List, Tabs } from 'antd';
import { useSelector } from 'react-redux';

// const dummyTaskList = [
//   {
//     task: 'Play League of Legends',
//     project: 'Project 1',
//     status: 'current'
//   },
//   {
//     task: 'Play Overwatch 2',
//     project: 'Project 2',
//     status: 'current'
//   }
// ];

interface MyTaskType {
  task: string
  project: string
  status: 'current' | 'new' | 'ongoing'
}

const MyTasks: React.FC = () => {
  const projectState = useSelector(selectProject);
  const myTasks: MyTaskType[] = [];
  projectState.forEach(project => {
    project.tasks.forEach(task => {
      task.members.forEach(member => {
        if (member.email === 'poding84@snu.ac.kr') {
          myTasks.push({
            task: task.name,
            project: project.name,
            status: 'ongoing'
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
          label: <span>Ongoing&nbsp;<Badge count={1}/></span>,
          key: 'ongoing',
          children: (
            <List
              dataSource={myTasks}
              renderItem={(item, i) => (
                <List.Item key={i}>
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
          label: <span>New&nbsp;<Badge count={5}/></span>,
          key: 'badge',
          children: 'New'
        },
        {
          label: 'Done',
          key: 'done',
          children: 'done'
        }
      ]}
    />
  );
};

export default MyTasks;
