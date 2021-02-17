import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from './Post.module.css';
import { MdCancel, MdCloudUpload } from 'react-icons/md';

import photo1 from '../../assets/animals/1.jpg';
import photo2 from '../../assets/animals/2.jpg';
import photo3 from '../../assets/animals/3.jpg';
import photo4 from '../../assets/animals/4.jpg';
import photo5 from '../../assets/animals/5.jpg';
import photo6 from '../../assets/animals/6.jpg';
import photo7 from '../../assets/animals/7.jpg';
import photo8 from '../../assets/animals/8.jpg';
import photo9 from '../../assets/animals/9.jpg';
import photo10 from '../../assets/animals/10.jpg';
import photo11 from '../../assets/animals/11.jpg';
import photo12 from '../../assets/animals/12.jpg';
import { request } from '../../utils/axios';

const bg = [];
bg[bg.length] = photo1;
bg[bg.length] = photo2;
bg[bg.length] = photo3;
bg[bg.length] = photo4;
bg[bg.length] = photo5;
bg[bg.length] = photo6;
bg[bg.length] = photo7;
bg[bg.length] = photo8;
bg[bg.length] = photo9;
bg[bg.length] = photo10;
bg[bg.length] = photo11;
bg[bg.length] = photo12;

function Post(props) {
  const postlistItem = props.postlistItem;
  const postlistName = postlistItem.postlistName;
  const memberPostlistId = postlistItem.memberPostlistId;
  const index = props.index;
  const history = useHistory();
  const handleMovePostList = () => {
    // 해당 저장 목록으로 이동.
    history.push(
      `/postlist/${memberPostlistId}/${postlistName}`,
      memberPostlistId,
    );
  };

  const handleDelete = () => {
    request('DELETE', `/api/memberPostlist/delete/${memberPostlistId}`);
    window.location.reload();
  };

  return (
    <div
      className={styles.frame}
      style={{ backgroundImage: `url(${bg[index]})` }}
    >
      <span onClick={() => handleMovePostList()} className={styles.name}>
        {postlistName}
      </span>
      <div className={styles.iconWrapper}>
        <MdCancel
          className={styles.deleteIcon}
          onClick={() => handleDelete()}
        />
      </div>
    </div>
  );
}

export default Post;
