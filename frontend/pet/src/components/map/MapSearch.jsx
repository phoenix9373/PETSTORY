import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';
import './MapSearch.scss';

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

function MapSearch({ onSearchInput, onSearchNum }) {
  const [searchInput, setSearchInput] = useState('');
  const [searchNum, setSearchNum] = useState('');

  const onInputChangeHandler = (e) => {
    setSearchInput(e.target.value);
  };

  const onNumChangeHandler = (e) => {
    setSearchNum(e.target.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    onSearchInput(searchInput);
    onSearchNum(searchNum);
  };

  return (
    <>
      <form className="mapsearch__form" onSubmit={onSubmitHandler}>
        <FormControl className="mapsearch__input">
          <InputLabel
            id="demo-mutiple-name-label"
            htmlFor="demo-customized-textbox"
          >
            동물병원 위치
          </InputLabel>
          <BootstrapInput
            id="demo-customized-textbox"
            placeholder="동물병원 위치"
            onChange={onInputChangeHandler}
            value={searchInput}
          />
        </FormControl>
        <FormControl className="mapsearch__num">
          <InputLabel id="demo-customized-select-label">검색결과 수</InputLabel>
          <Select
            labelId="demo-customized-select-label"
            id="demo-customized-select"
            onChange={onNumChangeHandler}
            input={<BootstrapInput />}
          >
            <MenuItem value={7}>7</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={15}>15</MenuItem>
          </Select>
        </FormControl>
        <button className="mapsearch__btn" type="submit">
          <FontAwesomeIcon
            icon={faSearch}
            size="3x"
            className="mapsearch__icon"
          />
        </button>
      </form>
    </>
  );
}
export default withRouter(MapSearch);
