import React, { useEffect, useState } from 'react';
import { request } from '../../utils/axios';
import { useHistory } from 'react-router-dom';

// CSS
import styles from './Comment.module.css';

// Material UI
import { Skeleton } from '@material-ui/lab';

function Comment(props) {
  // props : comment text, profile image, profile ID
  const { profileId, content } = props.comment;
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(false);
  // util
  const history = useHistory();

  // fetch 요청
  const fetchRequest = async () => {
    const response = await request(
      'GET',
      `/api/detail/profile/${profileId}`,
      {},
      {},
    );
    setLoading(true);
    setProfileData(() => response);
  };

  // method
  const handleProfile = () => {
    history.push(`/profile/${profileId}`);
  };

  useEffect(() => {
    fetchRequest();
  }, []);

  return (
    <div className={styles.frame}>
      <div className={styles.imgBox}>
        {loading ? (
          <img
            onClick={handleProfile}
            className={styles.image}
            src={profileData && profileData.imgFullPath}
            alt="img"
          />
        ) : (
          <Skeleton variant="circle" width={'35px'} height={'35px'}></Skeleton>
        )}
      </div>
      <div className={styles.balloon}>
        <span onClick={handleProfile} className={styles.profileId}>
          {profileData && profileData.nickname}
        </span>
        {/* <span className={styles.profileId}>{profileData.nickname}</span> */}
        <span>{content}</span>
      </div>
    </div>
  );
}

export default Comment;
