// React
import React, { useEffect, useRef, useState } from 'react';

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

function FeedDetail() {
  // Util - style, history and location(react router push)
  const location = useLocation();
  const classes = useStyles();
  const history = useHistory();

  // props로 받은 데이터 저장.
  const feedItem = location.state;

  // States
  const [comments, setComments] = useState([]);

  // UI 존재 유무에 대한 State
  const [loading, setLoading] = useState(false);

  // 댓글 작성 Ref
  const commentRef = useRef('');

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

  // 프로필 페이지 이동
  const handleProfile = () => {
    history.push(`/profile/${feedItem.profileId}`);
  };

  // 태그 검색 결과로 이동
  const handleTag = () => {
    console.log('태그 검색 결과로 이동');
    // history.push()
  };

  // 댓글 작성 요청
  const fetchCreateComment = async (data) => {
    request('POST', '/api/comment/create', data);
  };

  // 댓글 작성
  const handleCommentCreate = (e) => {
    e.preventDefault();
    const content = commentRef.current.value;
    const profileId = Number(localStorage.getItem('profileId'));
    const boardId = feedItem.boardId;

    const data = {
      profileId,
      boardId,
      content,
    };

    console.log(data);

    fetchCreateComment(data);

    commentRef.current.value = '';
  };

  // useEffect
  useEffect(() => {
    fetchDetail();
  }, []);

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
          <div className={styles.sectionTop}>
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
                profileId={feedItem.profileId}
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
          </div>
          <div className={styles.sectionBottom}>
            {/* 댓글표시 */}
            <div className={styles.comments}>
              <div className={styles.title}>
                <h3 className={styles.titleText}>발도장</h3>
                <Pets fontSize="small"></Pets>
              </div>
              {/* 더보기 버튼을 누를때마다 items에 push 함. */}
              {comments &&
                comments.map((comment) => (
                  <Comment comment={comment}></Comment>
                ))}
              {comments.length === 0 && (
                <h5 className={styles.commentInfo}>아직 댓글이 없습니다.</h5>
              )}
            </div>
            <div className={styles.commentForm}>
              <form className={styles.form} onSubmit={handleCommentCreate}>
                <input
                  type="text"
                  className={styles.input}
                  placeholder="댓글을 작성하세요"
                  ref={commentRef}
                />
                {/* <button
                  className={styles.submit}
                  onClick={handleCommentCreate}
                  type="button"
                >
                  <Pets fontSize="small"></Pets>
                </button> */}
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* <DetailFeed imageSrc={imageSrc}></DetailFeed> */}
    </>
  );
}

export default FeedDetail;
