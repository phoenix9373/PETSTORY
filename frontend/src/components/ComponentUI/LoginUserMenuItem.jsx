import { Menu, MenuItem, Button } from '@material-ui/core';
import React from 'react';

function LoginUserMenuItem(props) {
  return (
    <MenuItem onClick={props.onHandleClose}>
      <Button onClick={props.onHandleDelete}>{props.text}</Button>
    </MenuItem>
  );
}

export default LoginUserMenuItem;
