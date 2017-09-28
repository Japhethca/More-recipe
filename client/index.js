import { render } from 'react-dom';
import React from 'react';
import {BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import jwt from 'jsonwebtoken';
import thunk from 'redux-thunk'
import Home from './containers/Home';
import SignUpPage from './containers/SignUpPage';
import LoginPage from './containers/LoginPage';
import setAuthorizationToken from './utils/setAuthorization';
import { setCurrentUser } from './actions/requestHandlers/handleLoginrequest';
import rootReducers from './reducers/rootReducer';

const store = createStore(
  rootReducers,
  applyMiddleware(thunk)
)
if (localStorage.token){
  setAuthorizationToken(localStorage.token);
  store.dispatch(setCurrentUser(jwt.decode(localStorage.token)));  
}

render((
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path='/signin' component={LoginPage} />
        <Route path='/signup' component={SignUpPage} />
        <Route path='/' component={Home} />
      </Switch>
    </BrowserRouter>
  </Provider>
),
  document.getElementById('app')

);
