import React, { useState } from 'react';
import Modal from 'react-modal';
import { useDispatch } from 'react-redux';
import { addProfile } from '../../_actions/profileAction';

function ProfileModal(props) {
  const inputRef = React.createRef();
  const dispatch = useDispatch();

  const handleTestClose = () => {
    props.onClose();
  };

  const handleAddForm = (e) => {
    e.preventDefault();
    // 문자,숫자,마침표만 입력되도록 향후 추가
    const profileForm = {
      // member_id: sessionStorage.getItem('member_id')
      member_id: 22,
      nickname: inputRef.current.value,
      profile_state: 0, // 이거 사용자가 입력해야할까
      follower_num: 0,
      followee_num: 0,
      rank: '랭크',
    };

    dispatch(addProfile(profileForm))
      .then((res) => {
        const stringfyRes = JSON.stringify(res);
        console.log(`ProfileModal-프로필 생성 응답:${stringfyRes});
        }`);
        // ????????프로필 선택 모달로 이동해야 함,
      })
      .catch((err) => {
        // 에러나도 여기로 안들어감
        console.log('ProfileModal-프로필 생성 but 에러');
        console.log(err);
      });
  };

  const body = (
    <div className="modal-body">
      <form onSubmit={handleAddForm}>
        <h2>프로필 추가</h2>
        <p>
          Petstory를 이용할 다른 사용자를 등록하시려면 프로필을 추가해주세요.
        </p>
        {/* <input type="image"></input> */}
        <input ref={inputRef} type="text" placeholder="닉네임"></input>
        <button>완료</button>
        <button type="button" onClick={handleTestClose}>
          취소
        </button>
      </form>
    </div>
  );

  return (
    <Modal
      // className="modal"
      isOpen={props.test}
      onRequestClose={handleTestClose}
      style={{
        content: {
          top: '20%',
          left: '30%',
          right: '30%',
          bottom: '20%',
        },
      }}
    >
      {body}
    </Modal>
  );
}
export default ProfileModal;
