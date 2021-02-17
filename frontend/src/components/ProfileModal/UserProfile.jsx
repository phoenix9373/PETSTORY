import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createFollow } from '../../_actions/profileAction';
// component, css
import ModifyProfile from './ModifyProfile';
import FollowerList from './FollowerList';
import styles from './UserProfile.module.css';
// library
import Modal from 'react-modal';
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

  const followeeListInModal = (
    <div className={styles.modalBody}>
      <h2>followee 목록</h2>
      <p>body안</p>
      <p>body안</p>
      <p>body안</p>
      <p>body안</p>
      <p>body안</p>
      <p>body안</p>
    </div>
  );

  // rank
  // const [rankInfo, setRankInfo] = useState(null);
  // if (props.profile.follwerNum > 20) {
  //   setRankInfo(<SiBaidu color="gold" />);
  // } else if (props.profile.follwerNum > 10) {
  //   setRankInfo(<SiBaidu color="silver" />);
  // } else {
  //   setRankInfo(<SiBaidu color="white" />);
  // }
  return (
    // <div className={styles.UserProfileBox}>
    <div>
      <div className={styles.profileCard}>
        <img
          src={props.profile.imgFullPath}
          alt="프로필 사진"
          className={styles.profileImg}
        />
        <div className={styles.profileInfo}>
          <div className={styles.userProfileHeader}>
            <div className={styles.rank}>
              {/* rank: {props.profile.rank},{rankInfo} */}
            </div>
            <h2 className={styles.nickname}>
              닉네임: {props.profile.nickname}
            </h2>
          </div>
          <div className={styles.userProfileBody}>
            <h3 className={styles.follower} onClick={handleFollowerModal}>
              팔로워: {props.profile.followerNum}
            </h3>
            <FollowerList
              profile={props.profile}
              isFollowerModal={isFollowerModal}
            />
            <h3 className={styles.following} onClick={handleFolloweeModal}>
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
