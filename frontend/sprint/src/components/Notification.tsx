import { Avatar, List } from 'antd';

const Notification: React.FC = () => {
  return (
    <div className="notification">
      <div className="notification-title">
        Notifications
      </div>
      <List
        itemLayout="horizontal"
        dataSource={[1, 2, 3, 4]}
        renderItem={(item, i) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar>K</Avatar>}
              title={`Notification ${i}`}
              description="1 hour ago"
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default Notification;
