import { UserType } from '@store/zustand/user';
import { iconString } from '@utils/utils';
import { Avatar } from 'antd';

const AutoOption: React.FC<{ member: UserType }> = ({ member }: { member: UserType }) => {
  return (
    <div className="auto-option">
      <div className="avatar">
        <Avatar size="small" className="profile-image">{iconString(member.username)}</Avatar>
        {member.username}
      </div>
      <div className="email">
        {member.email}
      </div>
    </div>
  );
};

export default AutoOption;
