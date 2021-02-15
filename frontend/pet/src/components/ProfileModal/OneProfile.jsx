import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteProfile } from '../../_actions/profileAction';
// component, css
import ModifyProfile from './ModifyProfile';
import style from './OneProfile.module.css';
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

  const dispatch = useDispatch();

  // local에 profileId 저장
  const saveProfileId = (profileId) => {
    localStorage.removeItem('profileId'); // 기존 id 삭제
    localStorage.setItem('profileId', profileId); // 새로 저장
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
    <div>
      <li>
        {/* 프로필 이미지 */}
        <div className={style.oneOfProfiles}>
          <Link
            to={'/'}
            onClick={() => {
              saveProfileId(props.item.profileId);
            }}
          >
            <img
              className={style.oneOfProfileImg}
              src={props.item.imgFullPath}
              alt="프로필이미지"
            />
            <h2>{props.item.nickname}</h2>
            {/* 수정, 삭제 아이콘 */}
          </Link>
          <div className={classes.root}>
            <Fab className={classes.editIcon} color="secondary">
              <EditIcon
                className={classes.editIcon}
                onClick={handleModifyModal}
              />
            </Fab>
            <Fab className={classes.editIcon} color="primary">
              <HighlightOffIcon
                className={style.deleteIcon}
                onClick={handleDeleteProfile}
              />
            </Fab>
            {/* 수정 모달 */}
            <ModifyProfile
              isOpen={isModal}
              profile={props.item}
              closeModal={closeModifyModal}
              handleModify={handleModify}
            />
          </div>
        </div>
      </li>
    </div>
  );
}
export default OneProfile;
