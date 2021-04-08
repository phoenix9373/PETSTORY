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
import MenuDropdown from '../ComponentUI/MenuDropdown';

// library
import Slider from 'react-slick';
import styled from 'styled-components';

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
  const [commentReload, setCommentReload] = useState(false);

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
  const handleTag = (keyword) => {
    history.push({
      pathname: '/search',
      search: `?query=${keyword}`,
    });
  };

  // 댓글 작성 요청
  const fetchCreateComment = async (data) => {
    request('POST', '/api/comment/create', data);
  };

  // 댓글 작성
  const handleCommentCreate = async (e) => {
    e.preventDefault();
    const content = commentRef.current.value;
    const profileId = Number(localStorage.getItem('profileId'));
    const boardId = feedItem.boardId;

    const data = {
      profileId,
      boardId,
      content,
    };

    await fetchCreateComment(data);
    setCommentReload((prev) => !prev);
    fetchDetail();

    commentRef.current.value = '';
  };

  // 다중 이미지 슬라이드
  const settings = {
    dots: true,
    dotsClass: 'slick-dots slick-thumb',
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  // 다중 이미지 슬라이드 - styled components
  const Wrap = styled.div`
    margin: 0;
    width: 100%;
    .slick-arrow {
      margin: 8px;
    }
    .slick-prev:before {
      opacity: 0.8;
      color: white;
      left: 4px;
    }
    .slick-prev {
      z-index: 1;
      left: 0;
    }
    .slick-next:before {
      opacity: 0.8;
      color: white;
    }
    .slick-next {
      z-index: 1;
      right: -1px;
    }
    div {
      display: flex;
      align-items: center;
    }
  `;

  // useEffect
  useEffect(() => {
    fetchDetail();
  }, [commentReload]);

  return (
    <>
      <div className={styles.frame}>
        {/* 메인 이미지 */}
        <div className={styles.images}>
          {loading ? (
            <Wrap>
              <Slider {...settings}>
                {feedItem.files.map((article, idx) => (
                  <img
                    key={idx}
                    className={styles.image}
                    src={article.imgFullPath && article.imgFullPath}
                    alt="img"
                  />
                ))}
              </Slider>
            </Wrap>
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
                feedItem={feedItem}
              ></ListMenu>
            </div>

            {/* 본문 내용 - 글, 태그 */}
            <div className={styles.info}>
              {feedItem.context ? (
                <span className={styles.text}>{feedItem.context}</span>
              ) : (
                <span className={styles.empty}>현재 내용이 없습니다.</span>
              )}

              <ul className={styles.tags}>
                {/* {tags.map((tag) => (
                <li className={styles.tag}>{tag}</li>
              ))} */}
                {feedItem.boardHashtags &&
                  feedItem.boardHashtags.map((tag, index) => (
                    <li
                      key={index * 52363}
                      onClick={() => handleTag(tag.hashtagName)}
                      className={styles.tag}
                    >
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
