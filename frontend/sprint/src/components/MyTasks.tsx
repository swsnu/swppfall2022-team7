import { Badge, List, Tabs } from 'antd';

const dummyTaskList = [
  {
    task: 'Play League of Legends',
    project: 'Project 1',
    status: 'current'
  },
  {
    task: 'Play Overwatch 2',
    project: 'Project 2',
    status: 'current'
  }
];

const MyTasks: React.FC = () => {
  return (
    <Tabs
      style={{
        paddingBottom: 20
      }}
      defaultActiveKey='ongoing'
      items={[
        {
          label: <span>Ongoing&nbsp;<Badge count={1}/></span>,
          key: 'ongoing',
          children: (
            <List
              dataSource={dummyTaskList}
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
