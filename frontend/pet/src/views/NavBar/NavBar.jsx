import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import LogoutButton from '../../components/Accounts/Logout/Logout';
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
            {this.props.authenticated ? (
              <LogoutButton logout={this.props.logout} />
            ) : (
              <NavLink to="/login/">로그인</NavLink>
            )}
          </li>
        </ul>
      </nav>
    );
  }
}
export default NavBar;
