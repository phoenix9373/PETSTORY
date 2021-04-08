import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getProfileList } from '../../_actions/profileAction';
// component
import UserProfile from '../../components/ProfileModal/UserProfile';
import UserFeedsTabs from '../../components/ProfileModal/UserFeedsTabs';
// library
import Modal from 'react-modal';
import styles from './ProfilePage.module.css';

Modal.setAppElement('#root');
function Profile(props) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 프로필 정보 요청
  const profileId = props.match.params.profileId;
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setProfile(null);
        setError(null);
        setLoading(true);
        // const profileId = localStorage.getItem('currentProfileId');
        // const headers = {
        //   'Access-Control-Allow-Credentials': true,
        //   'Access-Control-Allow-Origin': '*',
        //   'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        // };
        await dispatch(getProfileList(profileId))
          .then((res) => {
            setProfile(res.payload);
          })
          .catch((err) => console.log(err));
        // const response = axios
        //   .get(`/detail/profile/${profileId}`, {}, headers)
        //   .then((res) => {
        //     const data = res.data;
        //     setProfile(data);
        //   });
        // setProfile(response.data);
      } catch (e) {
        setError(e);
        window.document.reload();
      }
      setLoading(false);
    };
    fetchProfile();
  }, [profileId]);

  if (loading) {
    return <div>로딩중..</div>;
  }
  if (error) {
    return <div>에러 발생</div>;
  }
  if (!profile) {
    return <div>profiles없다</div>;
  }

  // 프로필 수정
  const handleModify = (modiInfo) => {
    const { name, value } = modiInfo;
    setProfile({ ...profile, [name]: value });
  };

  return (
    <div className={styles.userProfileBox}>
      <UserProfile
        className={styles.profileEntire}
        profile={profile}
        handleModify={handleModify}
      />
      <UserFeedsTabs className={styles.profileFeeds} profile={profile} />
    </div>
  );
}
export default withRouter(Profile);
