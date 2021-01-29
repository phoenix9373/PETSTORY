import React, { useState } from 'react';
import Modal from 'react-modal';

function ProfileModal(props) {
  // dispatch(ProfileById()).then((res) => {
  //   const profile = res.data;
  // });
  const handleTestClose = () => {
    props.onClose();
  };
  const body = (
    <div className="modal-body">
      <h2>프로필 추가</h2>
      <input type="text" placeholder="닉네임"></input>
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
