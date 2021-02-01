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
            <NavLink to="/login/">로그인</NavLink>
          </li>
          <li>
            <NavLink to="/board/create">새글작성</NavLink>
          </li>
          <li>
            <NavLink to="/feed">메인피드</NavLink>
          </li>
          <li>
            <NavLink to="/profile">프로필</NavLink>
          </li>
          <li>
            <NavLink to="/map">지도</NavLink>
          </li>
        </ul>
      </nav>
    );
  }
}
export default NavBar;
