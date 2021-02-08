import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../_actions/userAction';
import Switch from '@material-ui/core/Switch';
import './NavBar.css';

function Navbar({ isLogin, toggleTheme }) {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const dispatch = useDispatch();
  const [theme, setState] = useState({
    checkedA: true,
    checkedB: true,
  });

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

  window.addEventListener('resize', showButton);

  if (isLogin) {
    return (
      <>
        <div className="navbar">
          <div className="navbar-container">
            <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
              PetStory
            </Link>
            <div className="menu-icon" onClick={handleClick}>
              <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
            </div>
            <ul className={click ? 'nav-menu active' : 'nav-menu'}>
              <li className="nav-item">
                <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                  피드
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/create"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  게시글 작성
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/map" className="nav-links" onClick={closeMobileMenu}>
                  지도
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/profile"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  프로필
                </Link>
              </li>

              <li>
                <Link
                  to="/login"
                  className="nav-links-mobile"
                  onClick={closeMobileMenu}
                >
                  회원가입
                </Link>
              </li>
            </ul>
            {button && (
              <Button onClick={onLogoutHandler} buttonStyle="btn--outline">
                Logout
              </Button>
            )}
          </div>
          <div className="theme-toggle-switch">
            <Switch
              checked={theme.checkedA}
              onChange={handleThemeChange}
              name="checkedA"
              color="default"
              inputProps={{ 'aria-label': 'secondary checkbox' }}
            />
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="navbar">
          <div className="navbar-container">
            <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
              PetStory
            </Link>
            <div className="menu-icon" onClick={handleClick}>
              <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
            </div>
            <ul className={click ? 'nav-menu active' : 'nav-menu'}></ul>
            {button && <Button buttonStyle="btn--outline">SIGN IN</Button>}
          </div>
        </div>
      </>
    );
  }
}

export default Navbar;
