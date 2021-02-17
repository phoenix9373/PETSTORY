import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { modifyProfile } from '../../_actions/profileAction';
// component, css
import style from './ModifyProfile.module.css';
// library
import Modal from 'react-modal';

function ModifyProfile(props) {
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const [imgFullPath, setImgFullPath] = useState(props.profile.imgFullPath);
  const [profileState, setProfileState] = useState(props.profile.profileState);

  // const userInfo = localStorage.getItem('user');
  // const memberId = JSON.parse(userInfo);

  const inputRef = React.createRef();
  // 수정 모달
  const handleModifyClose = () => {
    props.closeModal();
  };

  // 수정(닉네임)
  const handleModiInfo = (e) => {
    const modiInfo = { name: 'nickname', value: e.target.value };
    props.handleModify(modiInfo);
  };
  // 수정(사진) - 사진 저장(image) 및 인코딩(imgFullpath)
  const convertImage = (e) => {
    setImage(e.target.files[0]);
    const imgSrc = URL.createObjectURL(e.target.files[0]);
    setImgFullPath(imgSrc);
    const modiInfo = { name: 'imgFullPath', value: imgSrc };
    props.handleModify(modiInfo);
  };

  // 수정(공개여부) - profileState 변경
  const onStateChange = (e) => {
    setProfileState(e.target.value);
    const modiInfo = { name: 'profileState', value: e.target.value };
    props.handleModify(modiInfo);
  };

  // 수정 요청
  const handleModify = async (e) => {
    e.preventDefault();
    const profileForm = new FormData();

    // 이미지 변경x -> imgFullPath, 이미지 변경ㅇ -> image
    if (!image) {
      setImgFullPath(props.profile.imgFullPath);
      profileForm.append('imgFullPath', imgFullPath);
    } else {
      profileForm.append('imgFullPath', '');
    }

    profileForm.append('image', image);
    profileForm.append('nickname', inputRef.current.value);
    profileForm.append('profileState', profileState);

    await dispatch(modifyProfile(profileForm)).then();
    // props.handleModify(props.profile.profileId);
    props.closeModal();
  };

  const body = (
    <div className={style.modal_body}>
      <form onSubmit={handleModify}>
        <h2>프로필 수정</h2>
        <p>사진과 닉네임, 공개여부를 변경할 수 있습니다</p>
        <div className={style.imgBox}>
          <img
            className={style.profileImageInModify}
            src={imgFullPath}
            alt="프로필이미지"
          />
          {/* defaultvalue로 기존값넣어두면 에러, type="file"일때 defaultvalue넣는거 자체가 문제라고 함 */}
          <input type="file" onChange={convertImage} />
        </div>
        <input
          ref={inputRef}
          type="text"
          placeholder="닉네임"
          defaultValue={props.profile.nickname}
          onChange={handleModiInfo}
        />
        {/* 프로필 상태 */}
        <div className={style.stateBox}>
          <label>
            전체공개
            <input
              type="radio"
              name="state"
              value="PUBLIC"
              checked={profileState === 'PUBLIC' && 'checked'}
              onChange={(e) => {
                onStateChange(e);
              }}
            />
          </label>
          <label>
            친구에게만 공개
            <input
              type="radio"
              name="state"
              value="FRIEND"
              checked={profileState === 'FRIEND' && 'checked'}
              onChange={(e) => {
                onStateChange(e);
              }}
            />
          </label>
          <label>
            비공개
            <input
              type="radio"
              name="state"
              value="PRIVATE"
              checked={profileState === 'PRIVATE' && 'checked'}
              onChange={(e) => {
                onStateChange(e);
              }}
            />
          </label>
        </div>
        <button onSubmit={handleModify}>완료</button>
        <button type="button" onClick={handleModifyClose}>
          취소
        </button>
      </form>
    </div>
  );

  return (
    <Modal
      className={style.modal}
      isOpen={props.isOpen}
      onRequestClose={handleModifyClose}
      style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(15%, 50%)',
        },
      }}
    >
      {body}
    </Modal>
  );
}
export default ModifyProfile;
