import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './NavBarSide.module.css';

// React Icons
import { FaHome, FaPlusCircle, FaMapMarkerAlt } from 'react-icons/fa';
import { ImFire } from 'react-icons/im';
import { FiBox } from 'react-icons/fi';
import { request } from '../../utils/axios';

function NavBarSide(props) {
  const [postList, setPostList] = useState([]);

  const memberId = JSON.parse(localStorage.getItem('user')).id;

  const getPostList = async () => {
    const response = await request(
      'GET',
      `/api/memberPostlist/findAll/${memberId}`,
    );
    setPostList(() => response.data);
  };

  useEffect(() => {
    getPostList();
  });
  // }, [postListReload]);

  return (
    <div className={styles.navbarSide}>
      <Link className={styles.linkplus} to="/create">
        <FaPlusCircle className={styles.icon}></FaPlusCircle>
        <span>새 글 작성</span>
      </Link>
      <Link className={styles.link} to="/">
        <FaHome className={styles.icon}></FaHome>
        <span>홈</span>
      </Link>
      {/* <Link
        className={styles.link}
        to="/"
        onClick={() => (window.location.href = '/')}
      >
        <ImFire className={styles.icon}></ImFire>
        <span>최신</span>
      </Link> */}
      <Link className={styles.link} to="/map">
        <FaMapMarkerAlt className={styles.icon}></FaMapMarkerAlt>
        <span>우리 동네</span>
      </Link>

      {/* {postList &&
        postList.map((item) => (
          <Link
            key={item.memberPostlistId}
            className={styles.link}
            to={`/postlist/${item.memberPostlistId}/${item.postlistName}`}
            // onclick={() => {
            //   window.location.href = `/postlist/${item.memberPostlistId}/${item.postlistName}`;
            // }}
          >
            <FiBox className={styles.icon}></FiBox>
            <span>{item.postlistName}</span>
          </Link>
        ))} */}
      <Link className={styles.linkplus} to="/list">
        <FaPlusCircle className={styles.icon}></FaPlusCircle>
        <span>내 저장 피드</span>
      </Link>
    </div>
  );
}

export default NavBarSide;
