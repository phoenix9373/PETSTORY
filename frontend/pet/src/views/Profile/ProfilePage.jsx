import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import UserProfile from '../../components/ProfileModal/UserProfile';
import UserFeedsTabs from '../../components/ProfileModal/UserFeedsTabs';
import Modal from 'react-modal';
import './ProfilePage.css';
import axios from 'axios';

Modal.setAppElement('#root');
function Profile(props) {
  console.log(props.match.params.profileId);

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleModify = (modi) => {
    console.log('==============================프로필페이지의 modi');
    const temp = JSON.stringify(modi);
    console.log(temp);

    // const modiProfile = {
    //   profileState: modi.profileState,
    //   nickname: modi.nickname,
    //   imgFullPath: modi.imgFullPath, // 이미지 변경 시 확인
    // };
    // return setProfile(profile.concat(modiProfile));
  };

  // const onFinalModify = (e) => {
  //   console.log('profilePage에서');
  //   console.log(e);
  // };

  const profileId = props.match.params.profileId;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setProfile(null);
        setError(null);
        setLoading(true);
        // const profileId = localStorage.getItem('currentProfileId');
        const headers = {
          'Access-Control-Allow-Credentials': true,
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        };
        const response = axios
          .get(`/detail/profile/${profileId}`, {}, headers)
          .then((res) => {
            const data = res.data;
            setProfile(data);
          });
        // setProfile(response.data);
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };
    fetchProfile();
  }, [profileId]);
  if (loading) {
    return <div>로딩중..</div>;
  }
  if (error) {
    console.log(`ProfilePage에서 profile: ${profile}`);
    return <div>에러 발생</div>;
  }
  if (!profile) {
    return <div>profiles없다</div>;
  }
  console.log(profile);
  return (
    <div className="profileEntire">
      <div>
        <UserProfile profile={profile} handleModify={handleModify} />
      </div>
      <div>
        <UserFeedsTabs profile={profile} />
      </div>
    </div>
  );
}
export default withRouter(Profile);
