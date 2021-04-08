import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
// components
import Followee from './Followee';

import axios from 'axios';

function FolloweeList(props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [followees, setFollowees] = useState(null);
  // const [isFollowerModal, setFollowerModal] = useState(false);

  const handleFolloweeModal = () => {
    props.onCloseFolloweeList();
  };

  useEffect(() => {
    const fetchFollowees = async () => {
      try {
        setFollowees(null);
        setError(null);
        setLoading(true);
        const profileId = props.profile.profileId;
        await axios.get(`/api/pollow/follower/${profileId}`).then((res) => {
          setFollowees(res.data); // 응답: id, nickname, rank, state, member, followerNum, followeeNum, image:null
        });
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };
    fetchFollowees();
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
        isOpen={props.isFolloweeModal}
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
        <ul>
          {followees ? (
            followees.map((followee) => (
              <Followee key={followee.id} followee={followee} />
            ))
          ) : (
            <h2>followee가 없습니다.</h2>
          )}
        </ul>
        <button onClick={handleFolloweeModal}>닫기</button>
      </Modal>
    </div>
  );
}

export default FolloweeList;
