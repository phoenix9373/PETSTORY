import React, { Component } from 'react';
import UserProfile from '../../components/ProfileModal/UserProfile';
import UserFeedsTabs from '../../components/ProfileModal/UserFeedsTabs';
import Modal from 'react-modal';
import './Profile.css';

Modal.setAppElement('#root');
// 더미 데이터
const PROFILES = {
  profile_id: 1,
  nickname: '도도',
  rank: 'gold',
  follower_num: 30,
  followee_num: 50,
  member_id: 1,
  relation_id: 1,
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
class Profile extends Component {
  render() {
    return (
      <div>
        <div>
          <UserProfile profiles={PROFILES} />
        </div>
        <div>
          <UserFeedsTabs feeds={BOARDS} />
        </div>
      </div>
    );
  }
}

export default Profile;
