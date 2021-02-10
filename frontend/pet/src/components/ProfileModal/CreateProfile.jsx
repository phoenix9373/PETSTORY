import React, { useState } from 'react';
import Modal from 'react-modal';
import { useDispatch } from 'react-redux';
import { addProfile } from '../../_actions/profileAction';

function CreateProfile(props) {
  const [imgFile, setImgFile] = useState(null);
  const inputRef = React.createRef();
  const dispatch = useDispatch();

  const handleTestClose = () => {
    props.onClose();
  };

  const convertImg = (e) => {
    if (e.target.files[0]) {
      // const imageUrl = URL.createObjectURL(e.target.files[0]);
      // setImgFile({ imageUrl });
      setImgFile(e.target.files[0]);
    }
  };

  const handleAddForm = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('memberId', props.memberId);
    formData.append('nickname', inputRef.current.value);
    formData.append('image', imgFile);

    console.log(`form ${String.valueOf(formData)}`);

    dispatch(addProfile(formData))
      .then((res) => {
        const stringfyRes = JSON.stringify(res);
        console.log(`ProfileModal-프로필 생성 응답:${stringfyRes});
        }`);
        window.location.href = 'http://localhost:3000/select';
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
        <input type="file" onChange={convertImg}></input>
        <input ref={inputRef} type="text" placeholder="닉네임"></input>
        <button type="button" onClick={handleAddForm}>
          완료
        </button>
        <button type="button" onClick={handleTestClose}>
          취소
        </button>
      </form>
    </div>
  );

  return (
    <Modal
      // className="modal"
      isOpen={props.newProfile}
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
export default CreateProfile;
