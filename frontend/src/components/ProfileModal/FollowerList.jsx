import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';

// components
import Follower from './Follower';

import axios from 'axios';

function FollowerList(props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [followers, setFollowers] = useState(null);
  // const [isFollowerModal, setFollowerModal] = useState(false);

  const handleFollowerModal = () => {
    props.onCloseFollowerList();
  };

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        setFollowers(null);
        setError(null);
        setLoading(true);
        const profileId = props.profile.profileId;
        await axios.get(`/api/pollow/followee/${profileId}`).then((res) => {
          setFollowers(res.data); // 응답: id, nickname, rank, state, member, followerNum, followeeNum, image:null
        });
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
