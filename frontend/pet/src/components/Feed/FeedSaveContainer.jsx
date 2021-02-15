import React, { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    marginRight: 10,
    width: 80,
    textTransform: 'capitalize',
  },
});

function FeedSaveContainer(props) {
  const classes = useStyles();
  return (
    <Fragment>
      {/* span 부분 내용을 props.text로 대체 */}
      <span className={classes.root}>Collection</span>
      {/* <span className={classes.root}>{props.text}</span> */}
      <FontAwesomeIcon icon={faAngleDown} />
    </Fragment>
  );
}

export default FeedSaveContainer;
