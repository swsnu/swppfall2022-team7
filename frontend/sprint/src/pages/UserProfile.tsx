import useBindStore from '@store/zustand';
import { Avatar, Button, Input, message, Upload } from 'antd';
import { RcFile } from 'antd/lib/upload';
import { useState, useEffect } from 'react';
import { iconString, parseUrl } from '@utils/utils';
import UserAvatar from '@components/UserAvatar';

const UserProfile: React.FC = () => {
  const user = useBindStore(state => state.user);
  const editUser = useBindStore(state => state.editUser);
  const getUser = useBindStore(state => state.getUser);
  const uploadImage = useBindStore(state => state.uploadImage);
  const [editedName, setEditedName] = useState('');
  const onSaveClick = async (): Promise<void> => {
    await editUser(editedName);
    await getUser();
  };

  useEffect(() => {
    setEditedName(user?.username ?? '');
  }, [user]);

  const beforeUpload = async (file: RcFile): Promise<boolean> => {
    const isJpgorPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgorPng) {
      void message.error('You can only upload JPG/PNG file');
      return false;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      void message.error('Image must be smaller than 2MB');
      return false;
    }
    await uploadImage(file);
    await getUser();
    return false;
  };

  return (
    <div className="user-profile">
      <Upload
        showUploadList={false}
        beforeUpload={beforeUpload}
      >
        {user !== null && <UserAvatar className="profile-image" size={256} user={user} />}
      </Upload>
      <Button className="delete-image">Delete Image</Button>
      <div className="name-edit">
        Username
        <div className="name-flex">
          <Input placeholder="Username" value={editedName} onChange={e => setEditedName(e.target.value)} />
          <Button type="primary" disabled={user?.username === editedName || editedName === ''} onClick={() => { void onSaveClick(); }}>
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
