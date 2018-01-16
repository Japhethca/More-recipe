import { render } from 'react-dom';
import React from 'react';
import 'babel-polyfill';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwt from 'jsonwebtoken';

import { setCurrentUser } from './authentication/actions';
import { isValidToken, setAuthorizationToken } from './authentication/helpers/setAuthorization';
import LandingPage from './authentication/containers/LandingPage';
import store from './store/configureStore';
import App from './App';


if (localStorage.token && isValidToken(localStorage.token)) {
  setAuthorizationToken(localStorage.token);
  store.dispatch(setCurrentUser(jwt.decode(localStorage.token)));
}

render(
  (
    <Provider store={store}>
      <BrowserRouter>
        <Switch >
          <Route path="/" exact component={LandingPage} />
          <Route component={App} />
        </Switch>
      </BrowserRouter>
    </Provider>
  ),
  document.getElementById('app')
);
