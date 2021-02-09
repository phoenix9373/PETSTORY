import React, { useState, useEffect } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { history } from './utils/history';
import { PrivateRoute } from './hoc/PrivateRoute';
import './app.css';

// Page Load
import Account from './views/Accounts/Account';
import Create from './views/Board/Create';
import MainPage from './views/MainPage/MainPage';
import ProfilePage from './views/Profile/ProfilePage';
import Map from './views/Map/Map';
import PageNotFound from './views/PageNotFound/PageNotFound';
import CarToonize from './views/Cartoonize/CartoonizePage';

// Component Load
import SelectProfileModal from './components/ProfileModal/SelectProfileModal';
import NavBar from './components/NavBar/NavBar';
import MbtiModal from './components/ProfileModal/MbtiModal';

const getStorageTheme = () => {
  let theme = 'light-theme';
  if (localStorage.getItem('theme')) {
    theme = localStorage.getItem('theme');
  }
  return theme;
};

function App() {
  const [isLogin, setIslogin] = useState(false);
  const [theme, setTheme] = useState(getStorageTheme());

  const toggleTheme = () => {
    if (theme === 'light-theme') {
      setTheme('dark-theme');
    } else {
      setTheme('light-theme');
    }
  };

  const users = () => {
    const user = localStorage.getItem('user');
    // console.log(user);
    if (user === null) {
      setIslogin(false);
    } else {
      setIslogin(true);
    }
  };

  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    users();
  }, [localStorage.getItem('user')]);

  return (
    <>
      <Router history={history}>
        {isLogin && <NavBar toggleTheme={toggleTheme} isLogin={isLogin} />}
        <Switch>
          <Route path="/login" component={Account} />
          <PrivateRoute exact path="/" component={MainPage} />
          <PrivateRoute path="/create" component={Create} />
          <PrivateRoute path="/map" component={Map} />
          <PrivateRoute path="/profile" component={ProfilePage} />
          <PrivateRoute path="/select" component={SelectProfileModal} />
          <PrivateRoute path="/cartoonize" component={CarToonize} />
          <PrivateRoute path="/mbti" component={MbtiModal} />
          <Route component={PageNotFound} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
