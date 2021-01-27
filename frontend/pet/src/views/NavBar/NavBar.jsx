import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';

class NavBar extends Component {
  render() {
    return (
      <nav className="navBar">
        <ul>
          <li>
            <NavLink exact to="/">
              홈페이지
            </NavLink>
          </li>
          <li>
            <NavLink to="/register/">회원가입</NavLink>
          </li>
          <li>
            <NavLink to="/login/">로그인</NavLink>
          </li>
        </ul>
      </nav>
    );
  }
}
export default NavBar;
