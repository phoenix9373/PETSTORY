import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useDispatch } from 'react-redux';
import { getFollowerList } from '../../_actions/profileAction';

// components
import Follower from './Follower';

function FollowerList(props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [followers, setFollowers] = useState(null);
  const [isFollowerModal, setFollowerModal] = useState(false);

  const handleFollowerModal = () => {
    setFollowerModal(!isFollowerModal);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        setFollowers(null);
        setError(null);
        setLoading(true);
        const profileId = props.profile.profileId;
        await dispatch(getFollowerList(profileId)).then((res) => {
          console.log(res);
          console.log(res.payload);
          console.log('팔로워목록응답');
          setFollowers(res.payload); // 응답: id, nickname, rank, state, member, follower_num, followee_num
        });
        console.log(followers);
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
  return (
    <div>
      <Modal
        isOpen={props.isFollowerModal}
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
          {followers ? (
            followers.map((follower) => (
              <Follower key={follower.id} follower={follower} />
            ))
          ) : (
            <h2>follower가 없습니다.</h2>
          )}
        </ul>
        <button onClick={handleFollowerModal}>닫기</button>
      </Modal>
    </div>
  );
}

export default FollowerList;

// import React from 'react';

// const FollowerList = () => <div>에러뜰까봐 일단 주석처리</div>;

// export default FollowerList;
