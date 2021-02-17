import React, { useState, useEffect } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { history } from './utils/history';
import { PrivateRoute } from './hoc/PrivateRoute';
import './app.css';

// Page Load
import LandingPage from './views/LandingPage/Account';
import Create from './views/Board/Create';
import MainPage from './views/MainPage/MainPage';
import ProfilePage from './views/Profile/ProfilePage';
import Map from './views/Map/Map';
import PageNotFound from './views/PageNotFound/PageNotFound';
import CarToonize from './views/Cartoonize/CartoonizePage';
import UserDetail from './views/Accounts/UserDetailPage';
import DetailPage from './views/DetailPage/DetailPage';
import SelectProfileModal from './views/Profile/SelectProfileModal';
import FeedListMakePage from './views/FeedListMakePage/FeedListMakePage';

// Component Load
import NavBar from './components/NavBar/NavBar';
import NavBarSide from './components/NavBar/NavBarSide';
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
    <Router history={history}>
      <div className="app__wrapper">
        {isLogin && <NavBar toggleTheme={toggleTheme} isLogin={isLogin} />}
        {isLogin && <NavBarSide></NavBarSide>}
        <div className={isLogin && 'body__wrapper'}>
          <Switch>
            <Route path="/login" component={LandingPage} />
            {/* <PrivateRoute exact path="/main/:storage" component={MainPage} /> */}
            <PrivateRoute exact path="/" component={MainPage} />
            <PrivateRoute path="/detail/:boardId" component={DetailPage} />
            <PrivateRoute path="/list" component={FeedListMakePage} />
            <PrivateRoute path="/create" component={Create} />
            <PrivateRoute path="/map" component={Map} />
            <PrivateRoute path="/profile/:profileId" component={ProfilePage} />
            <PrivateRoute path="/select" component={SelectProfileModal} />
            <PrivateRoute path="/cartoonize" component={CarToonize} />
            <PrivateRoute path="/mbti" component={MbtiModal} />
            <PrivateRoute path="/userdetail" component={UserDetail} />
            <Route component={PageNotFound} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;