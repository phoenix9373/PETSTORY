import React, { useState } from 'react';
import Modal from 'react-modal';
import { useDispatch } from 'react-redux';
import { addProfile } from '../../_actions/profileAction';
import dogIcon from '../../assets/tempImage.png';
import MbtiModal from './MbtiModal';
import styles from './CreateProfile.module.css';

function CreateProfile(props) {
  const [imgFile, setImgFile] = useState(null);
  const [encodingImage, setEncodingImage] = useState(null);
  const [isMbti, setIsMbti] = useState(false);
  const [err, setErr] = useState(false);
  const [data, setData] = useState(false);

  const inputRef = React.createRef();
  const dispatch = useDispatch();

  const onCloseModal = () => {
    props.onClose();
    setEncodingImage(null);
  };

  const filesTrans = (files) => {
    setImgFile(files);
    const reader = new FileReader();
    const fileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    const { size, type } = files;

    setData(false);
    if (!fileTypes.includes(type)) {
      setErr('파일형식은 jpg나 png이어야 합니다.');
    }
    if (size / 1024 / 1024 > 2) {
      setErr('파일크기는 2MB이하여야 합니다');
    }
    setErr(false);

    reader.readAsDataURL(files[0]);
    reader.onload = (loadEvt) => {
      // 인코딩
      setData(loadEvt.target.result);
      setEncodingImage(loadEvt.target.result);
    };
  };

  const onImageChange = async (e) => {
    const files = e.target.files;
    await filesTrans(files); // file이 유효한지 검증
    const evt = { name: 'imgFullPath', files: encodingImage }; // select로 보내주기
    props.onChange(evt);
  };

  const onDrop = (e) => {
    console.log(e);
    e.preventDefault();
    const {
      dataTransfer: { files },
    } = e;
    filesTrans(files);
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const handleMbtiModal = () => {
    setIsMbti(!isMbti);
  };

  const handleAddForm = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('memberId', props.memberId);
    formData.append('nickname', inputRef.current.value);
    formData.append('image', imgFile);

    await dispatch(addProfile(formData)).then((res) => {
      const stringfyRes = JSON.stringify(res);
      console.log(`ProfileModal-프로필 생성 응답:${stringfyRes});
        }`);
      // window.location.href = 'http://localhost:3000/select';
    });
    setEncodingImage(null);
    props.onSubmit();
  };

  const body = (
    <div className="modal-body">
      <form onSubmit={handleAddForm}>
        <h2>프로필 추가</h2>
        <p>
          Petstory를 이용할 다른 사용자를 등록하시려면 프로필을 추가해주세요.
        </p>
        {/* 미리보기 */}
        <label htmlFor="profileImg">
          <div
            className={styles.dropAreaStyle}
            onDrop={onDrop}
            onDragOver={onDragOver}
          >
            {!encodingImage && (
              <div className={styles.placegHolderImage}>
                여기에 이미지를 드래그 하거나 클릭해 주세요
              </div>
            )}
            {encodingImage && (
              <img className={styles.dropAreaImageStyle} src={encodingImage} />
            )}
          </div>
        </label>

        <input
          type="file"
          files={props.imgFullPath}
          id="profileImg"
          name="imgFullPath"
          style={{ display: 'none' }}
          onChange={onImageChange}
        />
        <input
          name="nickname"
          value={props.nickname}
          onChange={props.onChange}
          ref={inputRef}
          type="text"
          placeholder="닉네임"
        ></input>
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
