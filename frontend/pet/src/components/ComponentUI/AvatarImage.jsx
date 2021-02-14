import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
    cursor: 'pointer',
  },
}));

export default function AvatarImage(props) {
  const classes = useStyles();

  return (
    <div onClick={props.onHandleProfile} className={classes.root}>
      <Avatar alt="Remy Sharp" src={props.imageSrc} />
    </div>
  );
}
