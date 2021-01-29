import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Page Load
import LandingPage from './views/LandingPage/LandingPage';
import LoginPage from './views/LoginPage/LoginPage';
import RegisterPage from './views/RegisterPage/RegisterPage';
import MainPage from './views/MainPage/MainPage';

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
        </Switch>
      </div>
    </Router>
  );
}

export default App;
