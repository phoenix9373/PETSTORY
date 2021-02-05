import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

function OneProfile({ item }) {
  const dispatch = useDispatch();
  const setProfileId = (profileId) => {
    localStorage.removeItem('profile_id'); // 기존 id 삭제
    const temp = profileId;
    console.log(`temp, profileId ${temp} ${profileId}`);
    localStorage.setItem('profile_id', temp); // 새로 저장
  };
  return (
    <div
      onClick={() => {
        setProfileId(item.id);
      }}
    >
      <li>
        <Link to={'/feed'}>{item.nickname}</Link>
      </li>
    </div>
  );
}
export default OneProfile;
