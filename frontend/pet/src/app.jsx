import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Page Load
import LandingPage from './views/LandingPage/LandingPage';
import LoginPage from './views/LoginPage/LoginPage';
import RegisterPage from './views/RegisterPage/RegisterPage';
import MainPage from './views/MainPage/MainPage';

import Profile from './views/Profile/Profile';

// Component Load
import NavBar from './views/NavBar/NavBar';
import Register from './views/Board/register';

// import Auth from './hoc/auth';

function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/board/register" component={Register} />
          <Route exact path="/main" component={MainPage} />
          <Route exact path="/profile" component={Profile} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
