import useBindStore from '@store/zustand';
import { Button, Input } from 'antd';
import { useState } from 'react';

const UserProfile: React.FC = () => {
  const user = useBindStore(state => state.user);
  const editUser = useBindStore(state => state.editUser);
  const getUser = useBindStore(state => state.getUser);
  const [editedName, setEditedName] = useState(user?.username ?? '');
  const onSaveClick = async (): Promise<void> => {
    await editUser(editedName);
    await getUser();
  };
  return (
    <div className="user-profile">
      <div className="name-edit">
        Username
        <div className="name-flex">
          <Input placeholder="Username" value={editedName} onChange={e => setEditedName(e.target.value)} />
          <Button className="name-save" disabled={user?.username === editedName || editedName === ''} onClick={() => { void onSaveClick(); }}>Save</Button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
