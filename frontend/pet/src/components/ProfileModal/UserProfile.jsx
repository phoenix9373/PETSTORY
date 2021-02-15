import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createFollow } from '../../_actions/profileAction';
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
  const [isFollow, setIsFollow] = useState('팔로우');
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
  };

  const handleModify = (modiProfile) => {
    props.handleModify(modiProfile);
  };

  // 모달 - Follower목록
  const handleFollowerModal = () => {
    setFollowerModal(!isFollowerModal);
  };

  // 팔로우 신청
  const handleFollow = (e) => {
    e.preventDefault();
    if (isFollow === '팔로우') {
      const followRequest = {
        follower_id: props.profile.profileId, // 이 프로필 주인
        followee_id: profileId, // 팔로우 신청한 사람(로그인)
      };

      dispatch(createFollow(followRequest)).then((res) => {
        if (res.payload === 'success') {
          setIsFollow('팔로우 취소');
        }
      });
    } else {
      // 팔로우 취소하는 api
      setIsFollow('팔로우');
    }
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
          {isFollow}
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
