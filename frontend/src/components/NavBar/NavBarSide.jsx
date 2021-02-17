import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NavBarSide.module.css';

// React Icons
import { FaHome, FaPlusCircle, FaMapMarkerAlt } from 'react-icons/fa';
import { ImFire } from 'react-icons/im';
import { FiBox } from 'react-icons/fi';

function NavBarSide(props) {
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
      <Link className={styles.link} to="/">
        <ImFire className={styles.icon}></ImFire>
        <span>최신</span>
      </Link>
      <Link className={styles.link} to="/map">
        <FaMapMarkerAlt className={styles.icon}></FaMapMarkerAlt>
        <span>우리 동네</span>
      </Link>
      <Link className={styles.link} to="/">
        <FiBox className={styles.icon}></FiBox>
        <span>Storage</span>
      </Link>
      <Link className={styles.linkplus} to="/postlist">
        <FaPlusCircle className={styles.icon}></FaPlusCircle>
        <span>저장목록 만들기</span>
      </Link>
      {/* <Link className={styles.link} to="/">
        <FiBox></FiBox>
        <span>Storage2</span>
      </Link> */}
    </div>
  );
}

export default NavBarSide;
