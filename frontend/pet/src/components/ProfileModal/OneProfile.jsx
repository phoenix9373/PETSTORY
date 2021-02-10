import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './OneProfile.css';
// ========== 프로필 닉네임 클릭 -> local에 profileId 저장 -> 메인 피드로 ㄱㄱ
function OneProfile({ item }) {
  const dispatch = useDispatch();
  const setProfileId = (profileId) => {
    localStorage.removeItem('profileId'); // 기존 id 삭제
    localStorage.setItem('profileId', profileId); // 새로 저장
  };
  return (
    <div
      onClick={() => {
        setProfileId(item.profileId);
      }}
    >
      <li>
        <div className="oneOfProfiles">
          <img
            className="oneOfProfileImg"
            src={item.imgFullPath}
            alt="프로필이미지"
          />
          <Link to={'/'}>
            <h2>{item.nickname}</h2>
          </Link>
        </div>
      </li>
    </div>
  );
}
export default OneProfile;
