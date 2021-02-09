import React, { useState, useEffect } from 'react';
import ProfileModal from './ProfileModal';
import Modal from 'react-modal';
import axios from 'axios';
import ModifyProfile from './ModifyProfile';
import MbtiModal from './MbtiModal';
// import FollowerList from './FollwoerList';

function UserProfile(props) {
  // const dispatch = useDispatch();
  const [isFollowerModal, setFollowerModal] = useState(false);
  const [isFolloweeModal, setFolloweeModal] = useState(false);
  const [isModifyModal, setModifyModal] = useState(false);
  const [test, setTest] = useState(false);
  const [mbtiTest, setMbtiTest] = useState(false);
  const [followers, setFollowers] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        setFollowers(null);
        setError(null);
        setLoading(true);
        const response = await axios.get(
          'https://jsonplaceholder.typicode.com/users', // `http://localhost:8080/profile/followers/${profile_id}` profile_id는 props에서 가져오기
        );
        // setFollowers((response.data) => {
        //   const followerList = response.data.map((follower) => {
        //     const obj = { followerId, nickname };
        //     return obj;
        //   });
        const dummyFollowers = [
          {
            followerId: 1,
            nickname: '연님이',
          },
          {
            followerId: 3,
            nickname: '길막이',
          },
        ];
        setFollowers(dummyFollowers);
        // setFollowers(response.data); // 응답: follower_id, nickname
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };
    fetchFollowers();
  }, []);
  if (loading) {
    return <div>로딩중..</div>;
  }
  if (error) {
    return <div>에러 발생</div>;
  }
  if (!followers) {
    return <div>followers 없다</div>;
  }

  const handleTest = () => {
    setTest(!test);
  };

  const closeTestModal = () => {
    setTest(false);
  };
  const handleMbti = () => {
    setMbtiTest(!mbtiTest);
  };

  const closeMbtiTestModal = () => {
    setMbtiTest(false);
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
      <button onClick={handleMbti}>MBTI 모달 테스트</button>
      <MbtiModal mbtiTest={mbtiTest} onClose={closeMbtiTestModal} />
      <div className="profileCard">
        <img
          src="https://i.ytimg.com/vi/AwrFPJk_BGU/maxresdefault.jpg"
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
              팔로워: {props.profile.follower_num}
            </h3>
            {/* {isFollowerModal && <FollowerList />} */}
            {/* <Modal
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
              <ul>
                {followers.map((follower) => (
                  <Follower key={follower.followerId} follower={follower} />
                ))}
              </ul>
              <button onClick={handleFollowerModal}>닫기</button>
            </Modal> */}
            <h3 className="following" onClick={handleFolloweeModal}>
              팔로잉: {props.profile.followee_num}
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
      <button onClick={handleModifyModal}>edit profile</button>
      <ModifyProfile
        profile={props.profile}
        isOpen={isModifyModal}
        onModify={closeModifyModal}
      />
    </div>
  );
}

export default UserProfile;
