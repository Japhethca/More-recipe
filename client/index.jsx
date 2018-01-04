import { render } from 'react-dom';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwt from 'jsonwebtoken';

import {
  setUser as setCurrentUser,
  isTokenValid, LoginPage, LandingPage, SignupPage,
  setAuthorization } from './authentication';
import store from './store/configureStore';
import App from './app/App';


if (localStorage.token && isTokenValid(localStorage.token)) {
  setAuthorization(localStorage.token);
  store.dispatch(setCurrentUser(jwt.decode(localStorage.token)));
}

render(
  (
    <Provider store={store}>
      <BrowserRouter>
        <Switch >
          <Route path="/signin" exact component={LoginPage} />
          <Route path="/signup" exact component={SignupPage} />
          <Route path="/landing" exact component={LandingPage} />
          <Route component={App} />
        </Switch>
      </BrowserRouter>
    </Provider>
  ),
  document.getElementById('app')
);
