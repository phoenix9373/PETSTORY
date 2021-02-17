import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../_actions/userAction';
import Switch from '@material-ui/core/Switch';
import './NavBar.scss';
import peticon from '../../assets/peticon.png';

// Components
import SearchBar from '../ComponentUI/SearchBar';
import NavbarIcons from '../ComponentUI/NavbarIcons';

function Navbar({ isLogin, toggleTheme }) {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const [isFocus, setIsfoused] = useState(false);

  const handleIsFocus = (val) => {
    setIsfoused(val);
  };

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const dispatch = useDispatch();
  const [theme, setState] = useState({
    checkedA: true,
  });

  // 알람수 받기 (store에 접근하여 state 가져오기)
  const { alarmNum } = useSelector((state) => state.alarmer);
  console.log(alarmNum);

  // 프로필 Id 선택
  const [profileId, setProfileId] = useState(48);
  const id = localStorage.getItem('profileId');
  useEffect(() => {
    setProfileId(id);
  }, [id]);

  // 스크롤 이벤트
  const [scrolled, setScrolled] = useState(false);
  const [scrollNum, setScrollNum] = useState();

  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset < 80) {
      setScrolled(false);
      setScrollNum('');
    } else if (offset < 500) {
      setScrolled(true);
      setScrollNum(1);
    } else if (offset < 1000) {
      setScrollNum(2);
    } else if (offset < 1500) {
      setScrollNum(3);
    } else if (offset < 2000) {
      setScrollNum(4);
    } else if (offset < 2500) {
      setScrollNum(5);
    } else if (offset < 3000) {
      setScrollNum(6);
    } else if (offset < 3500) {
      setScrollNum(7);
    } else if (offset < 4000) {
      setScrollNum(8);
    } else if (offset < 4500) {
      setScrollNum(9);
    } else if (offset < 5000) {
      setScrollNum(10);
    }
  };

  // 테마 변경 함수
  const handleThemeChange = (event) => {
    toggleTheme();
    setState({ ...theme, [event.target.name]: event.target.checked });
  };

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  const onLogoutHandler = () => {
    dispatch(logoutUser())
      .then((res) => {
        if (res.payload) {
          localStorage.removeItem('user');
          localStorage.removeItem('profileId');
          window.location.reload();
          // props.history.push('/login');
        } else {
          // eslint-disable-next-line
          alert('로그아웃에 실패하였습니다');
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    showButton();
  }, [isLogin]);

  window.addEventListener('scroll', handleScroll);
  window.addEventListener('resize', showButton);

  return (
    <>
      <div className={scrolled ? 'navbar active' : 'navbar'}>
        <div className={`pixelart-to-css active${scrollNum}`}></div>
        <div
          className={
            scrolled
              ? `navbar-background active${scrollNum}`
              : `navbar-background`
          }
        ></div>
        <div
          className={`navbar__section ${
            scrolled ? 'navbar-container active' : 'navbar-container'
          }`}
        >
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            <img className="navbar-icon" src={peticon} />
            PetStory
          </Link>
          <div className="navbar__right">
            <SearchBar
              handleIsFocus={handleIsFocus}
              isFocus={isFocus}
            ></SearchBar>
            <NavbarIcons
              handleIsFocus={handleIsFocus}
              isFocus={isFocus}
            ></NavbarIcons>
          </div>
          {/* <div className="theme-toggle-switch">
            <Switch
              checked={theme.checkedA}
              onChange={handleThemeChange}
              name="checkedA"
              color="default"
              inputProps={{ 'aria-label': 'secondary checkbox' }}
            />
          </div> */}
        </div>
      </div>
    </>
  );
}

export default Navbar;
