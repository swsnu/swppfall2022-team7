import { UserType } from '@store/zustand/user';
import UserAvatar from './UserAvatar';

const AutoOption: React.FC<{ member: UserType }> = ({ member }: { member: UserType }) => {
  return (
    <div className="auto-option">
      <div className="avatar">
        <UserAvatar size="small" className="profile-image" user={member} />
        {member.username}
      </div>
      <div className="email">
        {member.email}
      </div>
    </div>
  );
};

export default AutoOption;
