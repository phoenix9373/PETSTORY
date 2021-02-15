import React from 'react';
import { withRouter } from 'react-router-dom';

// CSS
import styles from './MainPage.module.css';

// Components
import FeedInfinite from '../../components/Feed/FeedInfinite';

function MainPage() {
  return (
    <div className={styles.mainPage}>
      <FeedInfinite />
    </div>
  );
}

export default withRouter(MainPage);
