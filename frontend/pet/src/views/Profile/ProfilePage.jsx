import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import UserProfile from '../../components/ProfileModal/UserProfile';
import UserFeedsTabs from '../../components/ProfileModal/UserFeedsTabs';
import Modal from 'react-modal';
import './ProfilePage.css';
import axios from 'axios';

Modal.setAppElement('#root');
// 더미 데이터
const PROFILES = {
  profile_id: 1,
  nickname: '도도',
  rank: 'gold',
  follower_num: 30,
  followee_num: 50,
  member_id: 1,
};
const BOARDS = [
  {
    board_id: 1,
    board_title: '첫번째 글',
    board_content: '첫번째 글 내용',
    board_date: 20210126,
    like_num: 3,
    report_num: 3,
    hashtag_id: 1,
    profile_id: 1,
  },
  {
    board_id: 2,
    board_title: '두번째 글',
    board_content: '두번째 글 내용',
    board_date: 20210126,
    like_num: 3,
    report_num: 3,
    hashtag_id: 1,
    profile_id: 1,
  },
];
// back에 profile 데이터 요청
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
        const response = await axios.get(
          'https://jsonplaceholder.typicode.com/users', // `http://localhost:8080/${profile_id}` profile_id는 session이나 local에서 가져오기
        );
        setProfile(response.data); // 응답: profile_id, rank, follower_num, followee_num
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
    return <div>에러 발생</div>;
  }
  if (!profile) {
    return <div>profiles없다</div>;
  }
  return (
    <div className="profileEntire">
      {/* {profile.map((item) => (
        <h2 key={item.id}>{item.name}</h2>
      ))} */}
      <div>
        <UserProfile profile={PROFILES} />
        {/* <UserProfile profile={profile} /> */}
      </div>
      <div>
        <UserFeedsTabs feeds={BOARDS} />
      </div>
    </div>
  );
}
export default withRouter(Profile);
