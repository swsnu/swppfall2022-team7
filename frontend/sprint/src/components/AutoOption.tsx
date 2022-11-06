import { MemberType } from '@utils/dummy';
import { Avatar } from 'antd';

const AutoOption: React.FC<{ member: MemberType }> = ({ member }: { member: MemberType }) => {
  return (
    <div className="auto-option">
      <div className="avatar">
        <Avatar size="small" className="profile-image">{member.avatar}</Avatar>
        {member.name}
      </div>
      <div className="email">
        {member.email}
      </div>
    </div>
  );
};

export default AutoOption;
