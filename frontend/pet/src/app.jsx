import React, { useState } from 'react';
import './app.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LandingPage from './views/LandingPage/LandingPage';
import NavBar from './views/NavBar/NavBar';
import Account from './views/Accouts/Account';
import PageNotFound from './views/PageNotFound/PageNotFound';
import { signIn } from './hoc/auth';
// import AuthRoute from './hoc/AuthRoute';

function App() {
  const [user, setUser] = useState(null);
  const authenticated = user != null;

  const login = ({ email, password }) => setUser(signIn({ email, password }));
  const logout = () => setUser(null);

  return (
    <Router>
      <div>
        <NavBar authenticated={authenticated} logout={logout} />
        <Switch>
          <Route
            path="/login"
            render={(props) => (
              <Account authenticated={authenticated} login={login} {...props} />
            )}
          />
          {/* <AuthRoute
            authenticated={authenticated}
            path="/profile"
            render={(props) => <Profile user={user} {...props} />}
          /> */}
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/login" component={Account} />

          <Route component={PageNotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
