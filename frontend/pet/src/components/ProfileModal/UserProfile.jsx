import React, { useState } from 'react';
import ProfileModal from './ProfileModal';
import Modal from 'react-modal';

function UserProfile(props) {
  // const dispatch = useDispatch();
  const [isFollowerModal, setFollowerModal] = useState(false);
  const [isFolloweeModal, setFolloweeModal] = useState(false);
  const [test, setTest] = useState(false);
  const handleTest = () => {
    setTest(!test);
  };

  const closeTestModal = () => {
    setTest(false);
  };

  const handleFollowerModal = () => {
    setFollowerModal(!isFollowerModal);
  };

  const handleFolloweeModal = () => {
    setFolloweeModal(!isFolloweeModal);
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
          src="https://i.ytimg.com/vi/AwrFPJk_BGU/maxresdefault.jpg"
          alt="프로필 사진"
          className="profileImg"
        />
        <div className="profileInfo">
          <div className="userProfileHeader">
            <h2 className="rank">rank: {props.profiles.rank}</h2>
            <h2 className="nickname">닉네임: {props.profiles.nickname}</h2>
          </div>
          <div className="userProfileBody">
            <h3 className="follower" onClick={handleFollowerModal}>
              팔로워: {props.profiles.follower_num}
            </h3>
            <Modal
              isOpen={isFollowerModal}
              onRequestClose={handleFollowerModal}
              style={{
                content: {
                  top: '20%',
                  left: '30%',
                  right: '30%',
                  bottom: '20%',
                },
              }}
            >
              {followerListInModal}
              <button onClick={handleFollowerModal}>닫기</button>
            </Modal>
            <h3 className="following" onClick={handleFolloweeModal}>
              팔로잉: {props.profiles.followee_num}
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
      <button>edit profile</button>
    </div>
  );
}

export default UserProfile;
