import React from 'react';
import './app.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LandingPage from './views/LandingPage/LandingPage';
import LoginPage from './views/LoginPage/LoginPage';
import RegisterPage from './views/RegisterPage/RegisterPage';
import NavBar from './views/NavBar/NavBar';
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
          {/* <Route exact path="/" component={Auth(landingPage, null)} />
          <Route exact path="/login" component={Auth(loginPage, false)} />
          <Route exact path="/register" component={Auth(registerPage, false)} /> */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
