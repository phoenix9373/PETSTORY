import React from 'react';

function Follower({ follower }) {
  // follower : id, nickname, rank, state, member, follower_num, followee_num
  return <li>{follower.nickname}</li>;
}
export default Follower;
