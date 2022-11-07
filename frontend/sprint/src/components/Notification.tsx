import { Avatar, List } from 'antd';

const dummyNotifications = [
  {
    title: <div>✏️ <b>SangHun Kim</b> commented on <b>Requirements and Specs</b></div>,
    description: '4 hours ago',
    avatar: 'K'
  },
  {
    title: <div>📎 <b>HyungJin Joo</b> uploaded a file to <b>Abstract</b></div>,
    description: '1 week ago',
    avatar: 'J'
  },
  {
    title: <div>📩 <b>Sanghyun Yi</b> invited you to <b>SPRINT</b></div>,
    description: '2 months ago',
    avatar: 'Y'
  }
];

const Notification: React.FC = () => {
  return (
    <div className="notification">
      <div className="notification-title">
        Notifications
      </div>
      <List
        itemLayout="horizontal"
        dataSource={dummyNotifications}
        renderItem={(item, i) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar>{item.avatar}</Avatar>}
              title={item.title}
              description={item.description}
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default Notification;
