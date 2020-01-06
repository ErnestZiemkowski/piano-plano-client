import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  HashRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import { Provider } from 'react-redux';
import jwtDecode from 'jwt-decode';

import './mainStyles.scss';
import store from './store';
import setAuthToken from './utils/setAuthToken';

import { setCurrentUser, logout } from './actions/auth';

import Login from './components/auth/Login';
import Register from './components/auth/Register';
import PrivateRoute from './components/layout/PrivateRoute';
import Dashboard from './components/dashboardView/Dashboard';
import Settings from './components/settingsView/Settings';
import FriendsBoard from './components/friendsBoardView/FriendsBoard';
import AgileBoard from './components/agileBoardView/AgileBoard';
import DailyGoalsBoard from './components/dailyGoalsView/DailyGoalsBoard';


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
              <PrivateRoute exact path="/friends" component={FriendsBoard} />
              <PrivateRoute exact path="/settings" component={Settings} />
              <PrivateRoute exact path="/agile-board" component={AgileBoard} />
              <PrivateRoute exact path="/daily-goals" component={DailyGoalsBoard} />
            </Switch>
          </Router>
        </Provider>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));

module.hot.accept();