// React
import React, { useEffect, useState } from 'react';

// CSS
import styles from './FeedDetail.module.css';

// React Router
import { useHistory, useLocation } from 'react-router-dom';

// axios
import { request } from '../../utils/axios';

// Material UI, icons
import { makeStyles } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { ExpandMore, Pets } from '@material-ui/icons';

// Components
import ListMenu from '../ComponentUI/ListMenu';
import Avatar from '../ComponentUI/AvatarImage';
import Comment from '../ComponentUI/Comment';

const useStyles = makeStyles((theme) => ({
  root: {
    color: 'black',
  },
  moreIcon: {
    fontSize: 12,
  },
}));

function FeedDetail(props) {
  // Util - style, history and location(react router push)
  const location = useLocation();
  const classes = useStyles();
  const history = useHistory();

  // props로 받은 데이터 저장.
  const feedItem = location.state;

  // States
  const [comments, setComments] = useState([]);
  const [commentIndex, setCommentIndex] = useState(0);
  const [visibleComments, setVisibleComments] = useState([]);

  // UI 존재 유무에 대한 State
  const [loading, setLoading] = useState(false);
  const [moreInfo, setMoreInfo] = useState(false);

  // Methods
  const fetchDetail = async () => {
    const comment = await request(
      'GET',
      `/api/comment/findAll/${feedItem.boardId}`,
      {},
      {},
    );

    setComments(() => comment.data);
    setLoading(true);
  };

  // 디테일 페이지에 보여지는 Comment를 3개씩 늘려준다.
  const onHandleVisibleComments = (start) => {
    // start가 크면 종료.
    const endIndex = start + 3;
    const items = [];
    for (let i = start; i < endIndex; ++i) {
      if (i > comments.length) {
        break;
      }
      if (comments[i] !== undefined) {
        items.push(comments[i]);
      }
    }

    setCommentIndex(() => endIndex);
    setVisibleComments((prev) => prev.concat(items));
  };

  // 프로필 페이지 이동
  const handleProfile = () => {
    history.push(`/profile/${feedItem.profileId}`);
  };

  // 태그 검색 결과로 이동
  const handleTag = () => {
    console.log('태그 검색 결과로 이동');
    // history.push()
  };

  // useEffect
  useEffect(() => {
    fetchDetail();
  }, []);

  useEffect(() => {
    console.log(`${comments.length}, ${visibleComments.length}`);
    if (loading && comments.length === visibleComments.length) {
      // "더 보기" 비활성화
      setMoreInfo(() => true);
    }
  }, [visibleComments]);

  return (
    <>
      <div className={styles.frame}>
        {/* 메인 이미지 */}
        <div className={styles.images}>
          {loading ? (
            <img
              className={styles.image}
              src={feedItem.files[0] && feedItem.files[0].imgFullPath}
              alt="img"
            />
          ) : (
            <Skeleton variant="rect" width={'30vw'} height={'30vw'}></Skeleton>
          )}
        </div>

        {/* 표시될 정보 */}
        <div className={styles.section}>
          {/* 프로필 및 리스트 아이콘 */}
          <div className={styles.user}>
            <div className={styles.profile}>
              {feedItem.imgFullPath && (
                <Avatar
                  imageSrc={feedItem.imgFullPath}
                  onHandleProfile={handleProfile}
                />
              )}
              <span onClick={handleProfile} className={styles.profileId}>
                {feedItem.nickname}
              </span>
            </div>

            <ListMenu
              boardId={feedItem.boardId}
              useClasses={`${classes.root} ${styles.option}`}
            ></ListMenu>
          </div>

          {/* 본문 내용 - 글, 태그 */}
          <div className={styles.info}>
            <span className={styles.text}>{feedItem.context}</span>
            <ul className={styles.tags}>
              {/* {tags.map((tag) => (
                <li className={styles.tag}>{tag}</li>
              ))} */}
              {feedItem.boardHashtags &&
                feedItem.boardHashtags.map((tag) => (
                  <li onClick={handleTag} className={styles.tag}>
                    #{tag.hashtagName}
                  </li>
                ))}
            </ul>
          </div>

          {/* 댓글표시 */}
          <div className={styles.comments}>
            <div className={styles.title}>
              <h3 className={styles.titleText}>발도장</h3>
              <Pets fontSize="small"></Pets>
            </div>
            {/* 더보기 버튼을 누를때마다 items에 push 함. */}
            {visibleComments &&
              visibleComments.map((comment) => (
                <Comment comment={comment}></Comment>
              ))}
            {comments.length === 0 && (
              <h5 className={styles.commentInfo}>아직 댓글이 없습니다.</h5>
            )}
            {comments.length > 0 && (
              <button
                className={`${styles.moreButton} ${
                  moreInfo ? styles.disabled : ''
                }`}
                type="button"
                onClick={() => onHandleVisibleComments(commentIndex)}
              >
                <span className={styles.commentMore}>
                  더보기
                  <ExpandMore className={classes.moreIcon} />
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
      {/* <DetailFeed imageSrc={imageSrc}></DetailFeed> */}
    </>
  );
}

export default FeedDetail;
