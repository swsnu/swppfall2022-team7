import { UserType } from '@store/zustand/user';
import { iconString, parseUrl } from '@utils/utils';
import { Avatar } from 'antd';

interface UserAvatarProps {
  className?: string
  size?: 'small' | number
  user: Omit<UserType, 'email' | 'id'>
};

const UserAvatar: React.FC<UserAvatarProps> = ({ className, size, user }: UserAvatarProps) => {
  if (user.image === undefined || user.image === '') {
    return <Avatar size={size} className={className}>{iconString(user.username)}</Avatar>;
  }
  return <Avatar size={size} className={className} src={<img src={parseUrl(user?.image)} />} />;
};

export default UserAvatar;
