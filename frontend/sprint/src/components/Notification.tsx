import useBindStore from '@store/zustand';
import { List } from 'antd';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Notification: React.FC = () => {
  const navigate = useNavigate();
  const noti = useBindStore(state => state.noti);
  const getNoti = useBindStore(state => state.getNoti);
  useEffect(() => {
    const getAsyncNoti = async (): Promise<void> => {
      await getNoti();
    };
    void getAsyncNoti();
  }, []);

  const notiSummary = noti?.slice(0, 5);

  return (
    <div className="notification">
      <div className="notification-title">
        Notifications
      </div>
      <List
        itemLayout="horizontal"
        dataSource={notiSummary}
        renderItem={(item, i) => (
          <List.Item onClick={() => navigate(item.link)} className="noti-cell">
            <List.Item.Meta
              title={<p dangerouslySetInnerHTML={{ __html: item.content }} />}
              description={item.created_at}
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default Notification;
