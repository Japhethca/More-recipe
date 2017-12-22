import { render } from 'react-dom';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwt from 'jsonwebtoken';

import configStore from './store';
import App from './containers/App';
import SignUpPage from './containers/SignUpPage';
import LoginPage from './containers/LoginPage';
import LandingPage from './containers/LandingPage';
import Authenticate from './components/common/Authenticate';
import { setAuthorizationToken, isValidToken } from './utils/setAuthorization';
import { setCurrentUser } from './actions/requestHandlers/handleLoginrequest';
import initialState from './reducers/initialState';
import getAllRecipes from './actions/requestHandlers/getAllRecipes';
import { getFavorites } from './actions/requestHandlers/handleUserFavorites';
import { handleGetUserProfile } from './actions/requestHandlers/handleUserProfile';
import './styles/sass/index.scss';


const store = configStore(initialState);

if (localStorage.token && isValidToken(localStorage.token)) {
  setAuthorizationToken(localStorage.token);
  store.dispatch(setCurrentUser(jwt.decode(localStorage.token)));
  store.dispatch(getFavorites(jwt.decode(localStorage.token).id));
  store.dispatch(getAllRecipes());
  store.dispatch(handleGetUserProfile());
}

render(
  (

    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path="/signin" exact component={LoginPage} />
          <Route path="/signup" exact component={SignUpPage} />
          <Route path="/landing" exact component={LandingPage} />
          <Route component={Authenticate(App)} />
        </Switch>
      </BrowserRouter>
    </Provider>
  ),
  document.getElementById('app')

);
