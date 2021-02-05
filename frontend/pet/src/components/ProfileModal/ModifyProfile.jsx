import React from 'react';
import Modal from 'react-modal';
import { useDispatch } from 'react-redux';
import { modifyProfile } from '../../_actions/profileAction';

function ModifyProfile(props) {
  const dispatch = useDispatch();
  const inputRef = React.createRef();
  const handleModifyClose = () => {
    props.onModify();
  };
  const handleModifyForm = (e) => {
    console.log('수정함수');
    e.preventDefault();
    const profileForm = {
      // member_id: localStorage.getItem('user')
      member_id: 13,
      nickname: inputRef.current.value,
      profile_state: 0,
      follower_num: 0,
      followee_num: 0,
      rank: '랭크',
    };
    dispatch(modifyProfile(profileForm)).then((res) => {
      const stringfyRes = JSON.stringify(res);
      console.log(`ModifyProfile 응답:${stringfyRes}`);
    });
    props.onModify(false);
  };
  const body = (
    <div className="modal-body">
      <form onSubmit={handleModifyForm}>
        <h2>프로필 추가</h2>
        <p>
          Petstory를 이용할 다른 사용자를 등록하시려면 프로필을 추가해주세요.
        </p>
        <input
          ref={inputRef}
          type="text"
          placeholder="닉네임"
          defaultValue={props.profile.nickname}
        ></input>
        <p>문자, 숫자, 마침표를 사용할 수 있습니다.</p>
        <button>완료</button>
        <button type="button" onClick={handleModifyClose}>
          취소
        </button>
      </form>
    </div>
  );

  return (
    <Modal
      className="modal"
      isOpen={props.isOpen}
      onRequestClose={handleModifyClose}
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

export default ModifyProfile;
