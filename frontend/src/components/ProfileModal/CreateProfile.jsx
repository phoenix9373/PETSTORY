import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProfile } from '../../_actions/profileAction';
// component
import MbtiModal from './MbtiModal';
// image
import dogIcon from '../../assets/tempImage.png';
// library
import Modal from 'react-modal';
import toast from 'react-hot-toast';

function CreateProfile(props) {
  const [imgFile, setImgFile] = useState(null);
  const [encodingImage, setEncodingImage] = useState(null);
  const [isMbti, setIsMbti] = useState(false);
  const inputRef = React.createRef();
  const dispatch = useDispatch();

  // Create 모달
  const onCloseModal = () => {
    props.onClose();
    setEncodingImage(null);
  };

  // MBTI 모달
  const handleMbtiModal = () => {
    setIsMbti(!isMbti);
  };

  // 프로필 생성 : 미리보기를 위해 이미지 인코딩
  const convertImg = (e) => {
    setImgFile(e.target.files[0]);
    console.log(e.target.files[0]);
    const imageUrl = URL.createObjectURL(e.target.files[0]);
    setEncodingImage(imageUrl);

    const newProfileInfo = { name: 'imgFullPath', value: imageUrl }; // img를 select로 보내주기
    props.handleInput(newProfileInfo);
  };

  // 프로필 생성 : nickname을 select에 보내주기
  const sendToSelect = (e) => {
    const newProfileInfo = { name: 'nickname', value: inputRef.current.value };
    props.handleInput(newProfileInfo);
  };

  // 프로필 생성 : formData -> axios,
  const handleAddForm = async (e) => {
    e.preventDefault();

    if (inputRef.current.value === '' || inputRef.current.value === null) {
      toast.error('닉네임을 입력해주세요');
      return;
    }

    if (imgFile === null || imgFile === undefined) {
      toast.error('프로필 이미지를 입력해주세요');
      return;
    }

    const formData = new FormData();
    formData.append('memberId', props.memberId);
    formData.append('nickname', inputRef.current.value);
    formData.append('image', imgFile);

    await dispatch(addProfile(formData))
      .then((res) => {
        const id = res.payload.id;
        props.onSubmit(id);
      })
      .catch((err) => console.log(err));
    console.log(imgFile);
    setEncodingImage(null);
  };

  const body = (
    <div className="modal-body">
      <form onSubmit={handleAddForm}>
        <h2>프로필 추가</h2>
        <p>
          Petstory를 이용할 다른 사용자를 등록하시려면 프로필을 추가해주세요.
        </p>
        {encodingImage ? (
          <img
            className="profileImageInModify"
            src={encodingImage}
            alt="프로필이미지"
          />
        ) : (
          <img
            className="profileImageInModify"
            src={dogIcon}
            alt="임시프로필"
          />
        )}
        <input
          type="file"
          files={props.imgFullPath}
          id="profileImg"
          name="imgFullPath"
          onChange={convertImg}
        />
        <input
          name="nickname"
          // value={props.nickname}
          ref={inputRef}
          type="text"
          placeholder="닉네임"
          onChange={sendToSelect}
        />
        <button type="button" onClick={handleMbtiModal}>
          MBTI
        </button>
        <MbtiModal
          mbtiTest={isMbti}
          onClose={handleMbtiModal}
          onSubmit={handleAddForm}
        />
        <button type="button" onClick={handleAddForm}>
          완료
        </button>
        <button type="button" onClick={onCloseModal}>
          취소
        </button>
      </form>
    </div>
  );

  return (
    <Modal
      // className="modal"
      isOpen={props.newProfile}
      onRequestClose={onCloseModal}
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
