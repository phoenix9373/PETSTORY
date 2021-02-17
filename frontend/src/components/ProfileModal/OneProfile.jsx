import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { saveAlarmNum } from '../../_reducers/alarmReducer';
import { deleteProfile, getAlarmNumdddd } from '../../_actions/profileAction';

// component, css
import ModifyProfile from './ModifyProfile';
import styles from './OneProfile.module.css';
// library
import toast from 'react-hot-toast';
// material UI
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
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

  // 프로필ID에 해당하는 알람수 요청 -> redux에 값 저장
  const dispatch = useDispatch();
  const getAlarm = async (profileId) => {
    await dispatch(getAlarmNumdddd(profileId)).then((res) => {
      dispatch(saveAlarmNum(res.payload)); // store의 state 바꾸는 함수 실행
    });
  };

  // local에 profileId 저장
  const saveProfileId = (profileId) => {
    localStorage.removeItem('profileId'); // 기존 id 삭제
    localStorage.setItem('profileId', profileId); // 새로 저장

    getAlarm(profileId);
    // props.handleChangeProfileId(profileId); // app에 profileId 변한 걸 알려주기
  };

  // 수정
  const handleModifyModal = () => {
    saveProfileId(props.item.profileId);
    setIsModal(true);
  };

  const closeModifyModal = () => {
    setIsModal(false);
  };

  const handleModify = (modiInfo) => {
    props.handleModify(modiInfo);
  };

  // 삭제
  const handleDeleteProfile = (e) => {
    // 삭제 재시도 -> toast 닫기, check변경
    const handleDeleteToast = (t) => {
      toast.dismiss(t.id);
      toast('삭제 버튼을 누르면 프로필이 삭제됩니다');
      setCheck(true);
    };
    // 처음 삭제 시도 -> toast 경고
    if (!check) {
      toast((t) => (
        <div>
          <p>❗ 프로필을 삭제하시겠습니까?</p>
          <br />
          <button onClick={handleDeleteToast}>확인</button>
          <button onClick={() => toast.dismiss(t.id)}>취소</button>
        </div>
      ));
      return;
    }
    e.preventDefault();

    props.onDelete(props.item.profileId); // select에서 프로필 삭제

    dispatch(deleteProfile(props.item.profileId));
  };

  return (
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
        <span className={styles.nickname}>{props.item.nickname}</span>
        {/* 수정, 삭제 아이콘 */}
      </Link>
      <div className={styles.icons}>
        <Fab className={styles.icon} color="primary">
          <EditIcon onClick={handleModifyModal} />
        </Fab>
        <Fab className={styles.icon} color="secondary">
          <HighlightOffIcon onClick={handleDeleteProfile} />
        </Fab>
        {/* 수정 모달 */}
        <ModifyProfile
          isOpen={isModal}
          profile={props.item}
          closeModal={closeModifyModal}
          handleModify={handleModify}
        />
      </div>
    </li>
  );
}
export default OneProfile;
