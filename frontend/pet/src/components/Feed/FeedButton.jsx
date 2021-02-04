import React from 'react';
import styles from './FeedButton.module.css';

// fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

function FeedButton(props) {
  return (
    <div
      className={
        props.isHover ? `${styles.frame} ${styles.active}` : `${styles.frame}`
      }
    >
      <button className={`${styles.btn} ${styles.left}`} type="button">
        <span className={styles.text}>내 피드</span>
        <FontAwesomeIcon icon={faAngleDown} />
      </button>
      <button className={`${styles.btn} ${styles.right}`} type="button">
        <span className={styles.text}>저장</span>
      </button>
    </div>
  );
}

export default FeedButton;
