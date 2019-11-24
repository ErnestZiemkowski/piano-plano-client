import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import {
  HashRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import { Provider } from 'react-redux';
import jwtDecode from 'jwt-decode';

import store from './store';
import { setCurrentUser, logout } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dashboardView/Dashboard';
import PrivateRoute from './components/common/PrivateRoute';


if(localStorage.jwtToken) {
  const token = localStorage.jwtToken;
  setAuthToken(token);
  const decoded = jwtDecode(token);
  store.dispatch(setCurrentUser(decoded));
  
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logout());
    window.location.href = ".#/login";
  }

}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Switch>
            <PrivateRoute exact path="/" component={Dashboard} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));

module.hot.accept();