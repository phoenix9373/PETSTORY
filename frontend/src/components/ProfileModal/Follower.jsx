import React from 'react';

function Follower({ follower }) {
  // follower : id, nickname, rank, state, member, follower_num, followee_num
  const { nickname } = follower.nickname;
  return <li>{nickname}</li>;
}
export default Follower;
