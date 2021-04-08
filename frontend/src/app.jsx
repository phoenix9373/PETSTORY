import React, { useState, useEffect } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { history } from './utils/history';
import { PrivateRoute } from './hoc/PrivateRoute';
import { getAlarmNumdddd } from './_actions/profileAction';
import { useDispatch } from 'react-redux';

import './app.css';

// Page Load
import LandingPage from './views/LandingPage/Account';
import Create from './views/Board/Create';
import Modify from './views/Board/Modify';
import MainPage from './views/MainPage/MainPage';
import ProfilePage from './views/Profile/ProfilePage';
import Map from './views/Map/Map';
import PageNotFound from './views/PageNotFound/PageNotFound';
import CarToonize from './views/Cartoonize/CartoonizePage';
import UserDetail from './views/Accounts/UserDetailPage';
import DetailPage from './views/DetailPage/DetailPage';
import SelectProfileModal from './views/Profile/SelectProfileModal';
import PostListMakePage from './views/PostListMakePage/PostListMakePage';
import PostListPage from './views/PostListPage/PostListPage';
import SearchPage from './views/SearchPage/SearchPage';

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
  const [alarmNum, setAlarmNum] = useState(null);
  const [profileId, setProfileId] = useState(null);
  const [isLocatedInSelect, setIsLocatedInSelect] = useState(false);

  const toggleTheme = () => {
    if (theme === 'light-theme') {
      setTheme('dark-theme');
    } else {
      setTheme('light-theme');
    }
  };

  const isSeletPage = () => {
    if (history.location.pathname === '/select') {
      setIsLocatedInSelect(true);
    } else {
      setIsLocatedInSelect(false);
    }
  };
  useEffect(() => {
    isSeletPage();
  }, [document.location.href]);

  const users = () => {
    const user = localStorage.getItem('user');
    if (user === null) {
      setIslogin(false);
    } else {
      setIslogin(true);
    }
  };

  const handleChangeProfileId = (profileId) => {
    setProfileId(profileId);
  };

  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    users();
  }, [localStorage.getItem('user')]);

  // 프로필ID 에 따른 알람 요청
  const dispatchForAlarm = useDispatch();
  useEffect(() => {
    if (profileId) {
      const fetchAlarm = async () => {
        await dispatchForAlarm(getAlarmNumdddd(profileId)).then((res) => {
          console.log(`app에서 ${profileId}의 알람수를 받는다.`, res);
          setAlarmNum(res.payload);
        });
      };
      fetchAlarm();
    }
  }, [profileId]);

  return (
    <Router history={history}>
      <div className="app__wrapper">
        {!isLocatedInSelect && (
          <>
            {isLogin && (
              <>
                <NavBar
                  toggleTheme={toggleTheme}
                  isLogin={isLogin}
                  alarmNum={alarmNum}
                />
                <NavBarSide></NavBarSide>
              </>
            )}
          </>
        )}
        <div className={isLogin ? 'body__wrapper' : ''}>
          <Switch>
            <Route path="/login" component={LandingPage} />
            {/* <PrivateRoute exact path="/main/:storage" component={MainPage} /> */}
            <PrivateRoute exact path="/" component={MainPage} />
            <PrivateRoute exact path="/search" component={SearchPage} />
            <PrivateRoute path="/detail/:boardId" component={DetailPage} />
            <PrivateRoute path="/list" component={PostListMakePage} />
            <PrivateRoute
              path="/postlist/:memberPostlistId/:postlistName"
              component={PostListPage}
            />
            <PrivateRoute path="/create" component={Create} />
            <PrivateRoute path="/update/:boardId" component={Modify} />
            <PrivateRoute path="/map" component={Map} />
            <PrivateRoute path="/profile/:profileId" component={ProfilePage} />
            <PrivateRoute
              path="/select"
              component={SelectProfileModal}
              onChangeProfileId={handleChangeProfileId}
            />
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
