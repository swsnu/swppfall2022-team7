import useBindStore from '@store/zustand';
import { Badge, List } from 'antd';
import { useNavigate } from 'react-router-dom';

const Notification: React.FC = () => {
  const navigate = useNavigate();
  const noti = useBindStore(state => state.noti);

  const notiSummary = noti?.slice(0, 30);

  return (
    <div className="notification">
      <div className="notification-title">
        Notifications
      </div>
      <List
        className="noti-list"
        itemLayout="horizontal"
        dataSource={notiSummary}
        renderItem={(item) => (
          <List.Item onClick={() => navigate(item.link)} className="noti-cell">
            <List.Item.Meta
              title={<p dangerouslySetInnerHTML={{ __html: item.content }} />}
              description={!item.checked ? <Badge dot>{item.created_at}</Badge> : item.created_at}
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default Notification;
