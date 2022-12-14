import useBindStore from '@store/zustand';
import { Button, Input, message, Upload } from 'antd';
import { RcFile } from 'antd/lib/upload';
import { useState, useEffect } from 'react';
import UserAvatar from '@components/UserAvatar';

const UserProfile: React.FC = () => {
  const user = useBindStore(state => state.user);
  const editUser = useBindStore(state => state.editUser);
  const getUser = useBindStore(state => state.getUser);
  const uploadImage = useBindStore(state => state.uploadImage);
  const deleteImage = useBindStore(state => state.deleteImage);
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
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isJpgorPng) {
      void message.error('You can only upload JPG/PNG file');
    } else if (!isLt2M) {
      void message.error('Image must be smaller than 2MB');
    } else {
      await uploadImage(file);
      await getUser();
    }
    return false;
  };

  const onDeleteClick = async (): Promise<void> => {
    await deleteImage();
    await getUser();
  };

  return (
    <div className="user-profile">
      <Upload
        showUploadList={false}
        beforeUpload={beforeUpload}
      >
        {user !== null && <UserAvatar className="profile-image" size={256} user={user} />}
      </Upload>
      <Button className="delete-image" onClick={() => { void onDeleteClick(); }}>Delete Image</Button>
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
