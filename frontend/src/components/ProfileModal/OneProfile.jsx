import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
// import { saveAlarmNum } from '../../_reducers/alarmReducer';
import { deleteProfile, getAlarmNumdddd } from '../../_actions/profileAction';
import { confirmAlert } from 'react-confirm-alert';
import '../ComponentUI/ConfirmAlert.css';
// component, css
import ModifyProfile from './ModifyProfile';
import styles from './OneProfile.module.css';
// library
import toast from 'react-hot-toast';
// material UI
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import ClearIcon from '@material-ui/icons/Clear';
import { makeStyles } from '@material-ui/core/styles';

// MUI Custom
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      display: 'none',
    },
    '&:hover > .editIcon': {
      display: 'inline-block',
      cursor: 'pointer',
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

function OneProfile(props) {
  const classes = useStyles();
  const [isModal, setIsModal] = useState(false);
  const [check, setCheck] = useState(false);
  const [name, setName] = useState(props.item.nickname);
  const dispatch = useDispatch();
  const init = (profileId) => {};

  // // 프로필ID에 해당하는 알람수 요청 -> redux에 값 저장
  // const getAlarm = async (profileId) => {
  //   await dispatch(getAlarmNumdddd(profileId)).then((res) => {
  //     dispatch(saveAlarmNum(res.payload)); // store의 state 바꾸는 함수 실행
  //   });
  // };

  // local에 profileId 저장
  const saveProfileId = async (profileId) => {
    localStorage.removeItem('profileId'); // 기존 id 삭제
    localStorage.setItem('profileId', profileId); // 새로 저장
    const temp = await axios
      .get(`/api/main/${profileId}`)
      .then((res) => {
        localStorage.removeItem('alarmNum');
        localStorage.setItem('alarmNum', res.data);
      })
      .catch((err) => {
        console.error(err);
      });
    window.location.href = '/';
    // getAlarm(profileId);
    // props.handleChangeProfileId(profileId); // app에 profileId 변한 걸 알려주기
  };

  const saveProId = async (profileId) => {
    localStorage.removeItem('profileId'); // 기존 id 삭제
    localStorage.setItem('profileId', profileId); // 새로 저장
    // getAlarm(profileId);
    // props.handleChangeProfileId(profileId); // app에 profileId 변한 걸 알려주기
  };

  // 수정
  const handleModifyModal = (e) => {
    e.preventDefault();
    saveProId(props.item.profileId);
    setIsModal(true);
  };

  const closeModifyModal = () => {
    setIsModal(false);
  };

  const handleModify = (modiInfo) => {
    props.handleModify(modiInfo);
  };

  // 삭제
  const handleDeleteProfile = () => {
    // 삭제 재시도 -> toast 닫기, check변경
    props.onDelete(props.item.profileId); // select에서 프로필 삭제
    dispatch(deleteProfile(props.item.profileId));
  };
  const deletemodal = () => {
    confirmAlert({
      title: '삭제?',
      message: '정말 식제하시겠습니까?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => handleDeleteProfile(),
        },
        {
          label: 'No',
        },
      ],
    });
  };
  return (
    <>
      <li className={styles.li}>
        {/* 프로필 이미지 */}
        <Link
          className={styles.link}
          to={'/'}
          onClick={() => {
            saveProfileId(props.item.profileId);
          }}
        >
          <img
            className={styles.img}
            src={props.item.imgFullPath}
            alt="프로필이미지"
          />
          <span className={styles.nickname}>{name}</span>
        </Link>
        {/* 수정, 삭제 아이콘 */}
        <div className={styles.icons}>
          <Fab
            className={styles.icon}
            onClick={handleModifyModal}
            color="primary"
          >
            <EditIcon />
          </Fab>
          <Fab className={styles.icon} onClick={deletemodal} color="secondary">
            <ClearIcon />
          </Fab>
        </div>
      </li>
      {/* 수정 모달 */}
      <ModifyProfile
        isOpen={isModal}
        profile={props.item}
        closeModal={closeModifyModal}
        handleModify={handleModify}
        setName={setName}
      />
    </>
  );
}
export default OneProfile;
