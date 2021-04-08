import React, { useState, useEffect } from 'react';
import { withRouter, Link } from 'react-router-dom';
// component, css
import OneProfile from '../../components/ProfileModal/OneProfile';
import CreateProfile from '../../components/ProfileModal/CreateProfile';
import styles from './SelectProfileModal.module.css';

// axios
import axios from 'axios';
// library
import toast, { Toaster } from 'react-hot-toast';
// assets
import plusSign from '../../assets/plus.png';

function SelectProfileModal({ onChangeProfileId }) {
  const [profiles, setProfiles] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isNewProfile, setNewProfile] = useState(false);
  const [inputs, setInputs] = useState({
    profileId: 0,
    nickname: '',
    imgFullPath: '',
  });

  // 프로필 생성용 input
  const { profileId, nickname, imgFullPath } = inputs;
  const handleInput = (e) => {
    const { name, value } = e;

    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  // Create 모달
  const handleAddProfile = () => {
    setNewProfile(!isNewProfile);
  };

  const closeAddProfile = () => {
    setNewProfile(false);
  };

  // 프로필 생성
  const handleCreate = (id) => {
    // 프로필 목록에 새로 생성한 프로필 추가
    const profile = {
      profileId: id,
      nickname,
      imgFullPath,
    };

    if (profiles) {
      setProfiles([...profiles, profile]);
    } else {
      setProfiles([profile]);
    }

    // setInputs({
    //   nickname: '',
    // });
    setNewProfile(false);
  };

  // 프로필 수정
  const handleModify = (modiInfo) => {
    const jsonModiProfileId = localStorage.getItem('profileId');
    const modiProfileId = JSON.parse(jsonModiProfileId);
    setProfiles(
      profiles.map((p) => {
        if (p.profileId === modiProfileId) {
          const { name, value } = modiInfo;
          return { ...p, [name]: value };
        } else {
          return p;
        }
      }),
    );
  };

  // 프로필 삭제
  const handleDelete = (id) => {
    setProfiles(profiles.filter((profile) => profile.profileId !== id));
  };

  // memberId의 멀티 프로필 정보 요청
  const memberId = JSON.parse(localStorage.getItem('user')).id;

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        setError(null);
        setLoading(true);
        const response = await axios.get(`/api/show/${memberId}`);
        if (response.data) {
          setProfiles(response.data);
        }
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };
    fetchProfiles();
  }, []);
  if (loading) {
    return <div></div>;
  }
  if (error) {
    return <div>에러 발생</div>;
  }
  return (
    <div>
      <Toaster
        position="top-center"
        reverseOrder={true}
        toastOptions={{
          style: {
            border: '1px solid #713200',
            padding: '16px',
            margin: '10vh',
            color: '#713200',
          },
        }}
      />
      <ul>
        <div className={styles.entireProfilesBox}>
          {!profiles ? (
            <h1 className={styles.info}>프로필을 만들어보세요.</h1>
          ) : (
            <h1 className={styles.info}>프로필을 선택하세요.</h1>
          )}
          <div className={styles.profileBox}>
            {!profiles
              ? ''
              : profiles.map((item) => (
                  <OneProfile
                    key={item.profileId}
                    item={item}
                    onDelete={handleDelete}
                    handleModify={handleModify}
                    // handleChangeProfileId={handleChangeProfileId}
                    // handleModiInput={handleModiInput}
                  />
                ))}
            <li className={styles.li} onClick={handleAddProfile}>
              <div className={styles.link}>
                <img
                  className={styles.img}
                  src={plusSign}
                  alt="프로필 추가 버튼"
                />
                <span className={styles.nickname}>새 가족 추가</span>
              </div>
            </li>
            <CreateProfile
              newProfile={isNewProfile}
              onClose={closeAddProfile}
              onSubmit={handleCreate}
              memberId={memberId}
              handleInput={handleInput}
              nickname={nickname}
              profileId={profileId}
              imgFullPath={imgFullPath}
            />
          </div>
        </div>
      </ul>
    </div>
  );
}
export default withRouter(SelectProfileModal);
