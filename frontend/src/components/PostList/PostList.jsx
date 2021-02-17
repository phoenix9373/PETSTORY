import React, { useState, useEffect, useRef } from 'react';
import styles from './PostList.module.css';
import { request } from '../../utils/axios';
import Post from '../ComponentUI/Post';

function PostList(props) {
  // State
  const [postList, setPostList] = useState([]);
  const [postListReload, setPostListReload] = useState(false);

  // Util

  // Ref
  const nameRef = useRef('');

  // 현재 로그인한 유저
  const memberId = JSON.parse(localStorage.getItem('user')).id;

  // Fetch - 저장 목록 조회 요청
  const getPostList = async () => {
    const response = await request(
      'GET',
      `/api/memberPostlist/findAll/${memberId}`,
    );
    setPostList(() => response.data);
  };

  // Fetch - 저장 목록 생성 요청
  const makePostList = async (data) => {
    await request('POST', '/api/memberPostlist/create', data);
    setPostListReload((prev) => !prev);
  };

  const handlePostListCreate = (e) => {
    e.preventDefault();
    const postlistName = nameRef.current.value;
    const memberId = JSON.parse(localStorage.getItem('user')).id;

    const data = {
      postlistName,
      memberId,
    };

    makePostList(data);
    getPostList();

    nameRef.current.value = '';
  };

  useEffect(() => {
    getPostList();
  }, [postListReload]);

  return (
    <>
      <div className={styles.title}>
        <h3>현재 저장 목록</h3>
      </div>
      <div className={`${styles.box} ${styles.top}`}>
        {postList.length > 0 &&
          postList.map((item, index) => (
            <Post
              postlistItem={item}
              postlistName={item.postlistName}
              index={index % 12}
              key={item.memberPostlistId}
            ></Post>
          ))}
      </div>

      <div className={styles.title}>
        <h3>새로운 저장 목록 만들기</h3>
      </div>
      <div className={`${styles.box} ${styles.bottom}`}>
        <form className={styles.form} onSubmit={handlePostListCreate}>
          <input
            type="text"
            className={styles.input}
            placeholder="저장목록 이름"
            ref={nameRef}
          />
          <button
            className={styles.submit}
            onClick={handlePostListCreate}
            type="button"
          >
            생성
          </button>
        </form>
      </div>
    </>
  );
}

export default PostList;
