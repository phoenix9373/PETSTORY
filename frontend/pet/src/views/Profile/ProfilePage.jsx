import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import UserProfile from '../../components/ProfileModal/UserProfile';
import UserFeedsTabs from '../../components/ProfileModal/UserFeedsTabs';
import Modal from 'react-modal';
import './ProfilePage.css';
import axios from 'axios';

Modal.setAppElement('#root');
function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setProfile(null);
        setError(null);
        setLoading(true);
        const profileId = localStorage.getItem('profileId');
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
        setProfile(response.data);
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };
    fetchProfile();
  }, []);
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
        <UserProfile profile={profile} />
      </div>
      <div>
        <UserFeedsTabs profile={profile} />
      </div>
    </div>
  );
}
export default withRouter(Profile);
