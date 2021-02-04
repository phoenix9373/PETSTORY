import React from 'react';
import styles from './FeedDetail.module.css';

// fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { TablePagination } from '@material-ui/core';

function FeedDetail(props) {
  // 데이터 받아오기
  // const {imgSrc, profileImgSrc, profileId, text, tags} = props;

  // 임시 데이터
  const imgSrc = 'https://cdn2.thecatapi.com/images/b2r.png';
  const profileImgSrc = 'https://cdn2.thecatapi.com/images/at5.png';
  const profileId = '이세상도도냥냥';
  const text =
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat obcaecati reprehenderit eveniet rem, possimus hic qui enim nobis, impedit deserunt optio corporis, ad quo aliquam? Nisi totam temporibus molestias quidem.';
  const tags = ['tag1', 'tag2', 'tag3', 'tag4', 'tag5', 'tag6', 'tag7'];

  return (
    <div className={styles.frame}>
      {/* 메인 이미지 */}
      <div className={styles.images}>
        <img className={styles.image} src={imgSrc} alt="img" />
      </div>

      {/* 표시될 정보 */}
      <div className={styles.section}>
        {/* 프로필 및 리스트 아이콘 */}
        <div className={styles.user}>
          <div className={styles.profile}>
            <img className={styles.profileImg} src={profileImgSrc} alt="cat" />
            <span>{profileId}</span>
          </div>
          <buuton className={styles.option} type="button">
            <FontAwesomeIcon icon={faEllipsisV} />
          </buuton>
        </div>

        {/* 본문 내용 - 글, 태그 */}
        <div className={styles.info}>
          <span className={styles.text}>{text}</span>
          <ul className={styles.tags}>
            {tags.map((tag) => (
              <li className={styles.tag}>{tag}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default FeedDetail;
