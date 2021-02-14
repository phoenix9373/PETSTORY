import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { followProfile } from '../../_actions/profileAction';
// component, css
import ModifyProfile from './ModifyProfile';
import FollowerList from './FollowerList';
// library
import Modal from 'react-modal';

function UserProfile(props) {
  // const dispatch = useDispatch();
  const [isFollowerModal, setFollowerModal] = useState(false);
  const [isFolloweeModal, setFolloweeModal] = useState(false);
  const [isModifyModal, setModifyModal] = useState(false);
  const [loginProfileId, setLoginProfileId] = useState(null);
  const dispatch = useDispatch();

  // profileId 가져오기
  const jsonProfileId = localStorage.getItem('profileId');
  const profileId = JSON.parse(jsonProfileId);
  useEffect(() => {
    setLoginProfileId(profileId);
  }, [jsonProfileId]);

  // 모달 - 수정
  const closeModifyModal = () => {
    setModifyModal(false);
  };

  const handleModifyModal = () => {
    setModifyModal(!isModifyModal);
    console.log(`isModifyModal ${isModifyModal}`);
  };

  const handleModify = (modiProfile) => {
    console.log('==============Userprofile에서 받은거');
    console.log(modiProfile);
    props.handleModify(modiProfile);
  };

  // 모달 - Follower목록
  const handleFollowerModal = () => {
    setFollowerModal(!isFollowerModal);
  };

  const handleFollow = (e) => {
    e.preventDefault();
    const profileId = localStorage.getItem('profileId');
    const followForm = new FormData();
    followForm.append('follower_ee', profileId);
    dispatch(followProfile(followForm)); // type이 안맞다는 에러뜬다.
  };

  // 모달 - Followee 목록
  const handleFolloweeModal = () => {
    setFolloweeModal(!isFolloweeModal);
  };

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
      {/* 내 프로필이면 '프로필 편집', 남의 프로필이면 '팔로우' 버튼 */}
      {props.profile.profileId === loginProfileId ? (
        <button type="button" onClick={handleModifyModal}>
          edit profile
        </button>
      ) : (
        <button type="button" onClick={handleFollow}>
          팔로우
        </button>
      )}
      <ModifyProfile
        profile={props.profile}
        isOpen={isModifyModal}
        closeModal={closeModifyModal}
        handleModify={handleModify}
      />
    </div>
  );
}

export default UserProfile;
