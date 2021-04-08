import React from 'react';

function Followee({ followee }) {
  // follower : id, nickname, rank, state, member, follower_num, followee_num
  return <li>{followee.nickname}</li>;
}
export default Followee;
