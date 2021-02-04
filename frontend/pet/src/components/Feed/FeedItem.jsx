import React, { Fragment, useEffect, useState } from 'react';
import FeedButton from './FeedButton';

// css 파일
import styles from './FeedItem.module.css';

// fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareAlt, faEllipsisH } from '@fortawesome/free-solid-svg-icons';

function FeedItem(props) {
  const [isHover, setIsHover] = useState(false);

  function onIsHover() {
    setIsHover(true);
  }

  function outIsHover() {
    setIsHover(false);
  }
  return (
    <div
      className={styles.item}
      onMouseOver={onIsHover}
      onMouseOut={outIsHover}
    >
      <img className={styles.image} src={props.imageSrc} alt="cat" />
      <FeedButton isHover={isHover} />
      <FontAwesomeIcon
        className={`${styles.icon} ${styles.left}`}
        icon={faShareAlt}
      />
      <FontAwesomeIcon
        className={`${styles.icon} ${styles.right}`}
        icon={faEllipsisH}
      />
    </div>
  );
}

export default FeedItem;
