import React, { useState, useEffect } from 'react';
import ProfileModal from './CreateProfile';
import Modal from 'react-modal';
import ModifyProfile from './ModifyProfile';
import FollowerList from './FollowerList';

function UserProfile(props) {
  // const dispatch = useDispatch();
  const [isFollowerModal, setFollowerModal] = useState(false);
  const [isFolloweeModal, setFolloweeModal] = useState(false);
  const [isModifyModal, setModifyModal] = useState(false);
  const [test, setTest] = useState(false);

  const handleTest = () => {
    setTest(!test);
  };

  const closeTestModal = () => {
    setTest(false);
  };

  const closeModifyModal = () => {
    setModifyModal(false);
  };

  const handleFollowerModal = () => {
    setFollowerModal(!isFollowerModal);
  };

  const handleFolloweeModal = () => {
    setFolloweeModal(!isFolloweeModal);
  };

  const handleModifyModal = () => {
    setModifyModal(!isModifyModal);
    console.log(`isModifyModal ${isModifyModal}`);
  };

  // dispatch(ProfileById()).then((res) => {
  //   const profile = res.data;
  // });
  const followerListInModal = (
    <div className="modal-body">
      <h2>follower 목록</h2>
      <p>body안</p>
      <p>body안</p>
      <p>body안</p>
      <p>body안</p>
      <p>body안</p>
      <p>body안</p>
      <p>body안</p>
      <p>body안</p>
      <p>body안</p>
      <p>body안</p>
      <p>body안</p>
      <p>body안</p>
      <p>body안</p>
      <p>body안</p>
      <p>body안</p>
      <p>body안</p>
      <p>body안</p>
      <p>body안</p>
      <p>body안</p>
      <p>body안</p>
      <p>body안</p>
      <p>body안</p>
      <p>body안</p>
      <p>body안</p>
      <p>body안</p>
      <p>body안</p>
      <p>body안</p>
      <p>body안</p>
      <p>body안</p>
      <p>body안</p>
      <p>body안</p>
      <p>body안</p>
      <p>body안</p>
      <p>body안</p>
    </div>
  );

  const followeeListInModal = (
    <div className="modal-body">
      <h2>followee 목록</h2>
      <p>body안</p>
      <p>body안</p>
      <p>body안</p>
      <p>body안</p>
      <p>body안</p>
      <p>body안</p>
    </div>
  );

  return (
    <div className="UserProfileBox">
      <button onClick={handleTest}>프로필 생성 모달 테스트</button>
      <ProfileModal test={test} onClose={closeTestModal} />
      <div className="profileCard">
        <img
          src={props.profile.imgFullPath}
          alt="프로필 사진"
          className="profileImg"
        />
        <div className="profileInfo">
          <div className="userProfileHeader">
            <h2 className="rank">rank: {props.profile.rank}</h2>
            <h2 className="nickname">닉네임: {props.profile.nickname}</h2>
          </div>
          <div className="userProfileBody">
            <h3 className="follower" onClick={handleFollowerModal}>
              팔로워: {props.profile.followerNum}
            </h3>
            <FollowerList />
            <h3 className="following" onClick={handleFolloweeModal}>
              팔로잉: {props.profile.followeeNum}
            </h3>
            <Modal
              isOpen={isFolloweeModal}
              onRequestClose={handleFolloweeModal}
              style={{
                content: {
                  top: '20%',
                  left: '30%',
                  right: '30%',
                  bottom: '20%',
                },
              }}
            >
              {followeeListInModal}
              <button onClick={handleFolloweeModal}>닫기</button>
            </Modal>
          </div>
        </div>
      </div>
      <button type="button" onClick={handleModifyModal}>
        edit profile
      </button>
      <ModifyProfile
        profile={props.profile}
        isOpen={isModifyModal}
        onModify={closeModifyModal}
      />
    </div>
  );
}

export default UserProfile;
