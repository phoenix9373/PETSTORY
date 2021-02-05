import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ProfileList } from '../../_actions/profileAction';
import axios from 'axios';
import { withRouter, Link } from 'react-router-dom';
import OneProfile from './OneProfile';

function SelectProfileModal() {
  const [profiles, setProfiles] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        setProfiles(null);
        setError(null);
        setLoading(true);
        // const memberId = sessionStorage.setItem('member_id')
        const memberId = 22;
        const response = await axios.get(
          // 'https://jsonplaceholder.typicode.com/users', // `http://localhost:8080/${memberId}`
          `/show/${memberId}`,
        );
        console.log('SelectProfileModal의 응답');
        console.log(JSON.stringify(response));
        const dummy = [
          { profileId: 1, nickname: '무' },
          { profileId: 2, nickname: '래기' },
          { profileId: 3, nickname: '래기' },
          { profileId: 4, nickname: '래기' },
        ];
        // setProfiles(dummy);
        setProfiles(response.data);
      } catch (e) {
        console.log('catch');
        setError(e);
      }
      setLoading(false);
    };
    fetchProfiles();
  }, []);
  if (loading) {
    return <div>로딩중..</div>;
  }
  if (error) {
    return <div>에러 발생</div>;
  }
  if (!profiles) {
    return <div>profiles없다</div>;
  } else {
    return (
      <div>
        <ul>
          {profiles.length > 0 ? (
            profiles.map((item) => <OneProfile key={item.id} item={item} />)
          ) : (
            <li>프로필을 만들어보세요</li>
          )}
          <li>
            <button>+</button>
          </li>
        </ul>
      </div>
    );
  }
}
export default withRouter(SelectProfileModal);
