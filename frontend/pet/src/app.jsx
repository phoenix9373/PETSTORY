import React from 'react';
import './app.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import landingPage from './components/LandingPage/landingPage';
import loginPage from './components/LoginPage/loginPage';
import registerPage from './components/RegisterPage/registerPage';
import Auth from './hoc/auth';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Auth(landingPage, null)} />
          <Route exact path="/login" component={Auth(loginPage, false)} />
          <Route exact path="/register" component={Auth(registerPage, false)} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
