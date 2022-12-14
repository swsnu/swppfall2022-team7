import useBindStore from '@store/zustand';
import { Modal } from 'antd';
import UserAvatar from './UserAvatar';

const ProfileModal: React.FC = () => {
  const selectedUser = useBindStore(state => state.selectedUser);
  const showProfileModal = useBindStore(state => state.showProfileModal);
  const setShowProfileModal = useBindStore(state => state.setShowProfileModal);

  const onCancel = async (): Promise<void> => {
    await setShowProfileModal(false);
  };

  return (
    <>
      <Modal
        title="User Profile"
        open={showProfileModal}
        footer={null}
        width={400}
        onCancel={() => { void onCancel(); }}
      >
        <div className="user-profile-modal">
          {selectedUser !== null && <UserAvatar className="profile-image" size={256} user={selectedUser} />}
          <div className="name">{selectedUser?.username}</div>
          <div className="email">{selectedUser?.email}</div>
        </div>
      </Modal>
    </>
  );
};

export default ProfileModal;
