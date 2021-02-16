import React from 'react';

function Follower(props) {
  const { nickname } = props.follower;
  return <li>{nickname}</li>;
}
export default Follower;
