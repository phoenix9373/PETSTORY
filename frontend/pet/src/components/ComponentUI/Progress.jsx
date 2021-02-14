import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
    color: 'gray',
    position: 'fixed',
    zIndex: 999,
    top: 0,
    left: '50%',
    // width: '100%',
    // height: '100%',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
}));

export default function CircularIndeterminate() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress />
    </div>
  );
}
