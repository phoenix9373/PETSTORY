import React from 'react';
import { createMuiTheme, makeStyles } from '@material-ui/core/styles';
import {
  ThemeProvider,
  // Select
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Button,
} from '@material-ui/core';
// CssBaseline
import ScopedCssBaseline from '@material-ui/core/ScopedCssBaseline';
// FAB
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import ShareIcon from '@material-ui/icons/Share';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import EditIcon from '@material-ui/icons/Edit';
import FavoriteIcon from '@material-ui/icons/Favorite';
import NavigationIcon from '@material-ui/icons/Navigation';

// 테마 커스터마이징
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#2196f3',
    },
    secondary: {
      main: '#0f0',
    },
  },
  typography: {
    fontFamily: 'Comic Sans MS',
  },
  background: {
    paper: '#0f0',
  },
  text: {
    primary: 'rgba(250, 250, 250, 0.87)',
    secondary: 'rgba(250, 250, 250, 0.87)',
    disabled: 'rgba(250, 250, 250, 0.87)',
    hint: 'rgba(250, 250, 250, 0.87)',
  },
});

// 스타일 커스터마이징
const useStyles = makeStyles((theme) => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  root: {
    backgroundColor: 'red',
    width: 200,
    height: 200,
    position: 'relative',
    '& .icon': {
      display: 'none',
    },
    '&:hover .icon': {
      display: 'inline-block',
      cursor: 'pointer',
      zIndex: 1,

      position: 'absolute',
    },
    '&:hover .right': {
      right: 100,
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

// 컴포넌트
export default function FeedTest() {
  const classes = useStyles();
  const [age, setAge] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div className={classes.root}>
      <Fab className="icon" size="small" color="primary" aria-label="add">
        <ShareIcon fontSize="default" />
      </Fab>
      <Fab
        className="icon right"
        size="small"
        color="secondary"
        aria-label="edit"
      >
        <MoreHorizIcon fontSize="default" />
      </Fab>
      {/* <Fab variant="extended">
            <NavigationIcon className={classes.extendedIcon} />
            Navigate
          </Fab>
          <Fab aria-label="like">
            <FavoriteIcon style={{ fontSize: 30 }} />
          </Fab> */}
    </div>
  );
}
