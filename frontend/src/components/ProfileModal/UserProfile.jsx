import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createFollow } from '../../_actions/profileAction';
// component, css
import ModifyProfile from './ModifyProfile';
import FollowerList from './FollowerList';
import FolloweeList from './FolloweeList';
import styles from './UserProfile.module.css';

// import { SiBaidu } from 'react-icons/si';

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
    // }, [jsonProfileId]);
  }, []);

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

  // 모달 - Follower 목록
  const handleFollowerModal = () => {
    setFollowerModal(!isFollowerModal);
  };

  // 팔로우 신청
  const handleFollow = (e) => {
    e.preventDefault();
    if (isFollow === '팔로우') {
      const followRequest = {
        follower_id: props.profile.profileId, // 이 프로필 주인
        followee_id: profileId, // 팔로우 신청한 사람(로그인 유저)
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

  return (
    <div>
      <div className={styles.profileCard}>
        <div className={styles.imgBox}>
          <img
            src={props.profile.imgFullPath}
            alt="프로필 사진"
            className={styles.profileImg}
          />
        </div>
        <div className={styles.profileInfo}>
          <div>
            <h2 className={styles.nickname}>{props.profile.nickname}</h2>
          </div>
          <div className={styles.userProfileBody}>
            <div className={styles.text} onClick={handleFollowerModal}>
              <p className={styles.p}>{props.profile.followeeNum}</p>
              <p className={styles.pTag}>날 좋아해요 </p>
            </div>
            <FollowerList
              profile={props.profile}
              isFollowerModal={isFollowerModal}
              onCloseFollowerList={handleFollowerModal}
            />
            <div className={styles.text} onClick={handleFolloweeModal}>
              <p className={styles.p}>{props.profile.followerNum}</p>
              <p className={styles.pTag}>내가 좋아해요</p>
            </div>
            <FolloweeList
              profile={props.profile}
              isFolloweeModal={isFolloweeModal}
              onCloseFolloweeList={handleFolloweeModal}
            />
          </div>
        </div>
      </div>
      {/* 내 프로필이면 '프로필 편집', 남의 프로필이면 '팔로우' 버튼 */}
      {props.profile.profileId === loginProfileId ? (
        <button
          type="button"
          className={styles.btn}
          onClick={handleModifyModal}
        >
          edit profile
        </button>
      ) : (
        <button type="button" className={styles.btn} onClick={handleFollow}>
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
