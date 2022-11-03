import { Badge, List, Tabs } from 'antd';

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
              dataSource={[1, 2, 3]}
              renderItem={item => <List.Item>{item}</List.Item>}
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
