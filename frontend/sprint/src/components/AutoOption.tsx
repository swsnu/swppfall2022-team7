import { Avatar } from 'antd';

const AutoOption: React.FC = () => {
  return (
    <div className="auto-option">
      <div className="avatar">
        <Avatar size="small" className="profile-image">H</Avatar>
        Seokwoo Choi
      </div>
      <div className="email">
        poding84@snu.ac.kr
      </div>
    </div>
  );
};

export default AutoOption;
