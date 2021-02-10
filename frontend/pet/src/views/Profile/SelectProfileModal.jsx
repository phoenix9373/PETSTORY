import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { withRouter, Link } from 'react-router-dom';
import OneProfile from '../../components/ProfileModal/OneProfile';
import CreateProfile from '../../components/ProfileModal/CreateProfile';
import './SelectProfileModal.css';

// ========멀티 프로필 선택, memberId로 요청 보내서 프로필 정보 받아오고 뿌려줌
function SelectProfileModal() {
  const [profiles, setProfiles] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isNewProfile, setNewProfile] = useState(false);

  const handleAddProfile = () => {
    setNewProfile(!isNewProfile);
  };
  const closeAddProfile = () => {
    setNewProfile(false);
  };
  const memberId = JSON.parse(localStorage.getItem('user')).id;

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        setProfiles(null);
        setError(null);
        setLoading(true);
        const memberId = JSON.parse(localStorage.getItem('user')).id;
        const response = await axios.get(`/show/${memberId}`);
        if (response.data) {
          setProfiles(response.data);
          console.log(`response: ${JSON.stringify(response)}`);
          const temp = JSON.stringify(response.data);
          console.log(`response.data ${temp}`);
        }
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
  return (
    <div>
      <ul>
        <div className="EntireProfilesBox">
          <div className="ProfileBox">
            {profiles ? (
              profiles.map((item) => (
                <OneProfile key={item.profileId} item={item} />
              ))
            ) : (
              <li>프로필을 만들어보세요</li>
            )}
          </div>
          <li>
            <button onClick={handleAddProfile}>
              <h2>+</h2>
            </button>
            <CreateProfile
              newProfile={isNewProfile}
              onClose={closeAddProfile}
              memberId={memberId}
            />
          </li>
        </div>
      </ul>
    </div>
  );
}
export default withRouter(SelectProfileModal);
