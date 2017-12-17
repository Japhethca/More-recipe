import { render } from 'react-dom';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import jwt from 'jsonwebtoken';
import thunk from 'redux-thunk';
import reduxReset from 'redux-reset';

import App from './containers/App';
import { setAuthorizationToken } from './utils/setAuthorization';
import { setCurrentUser } from './actions/requestHandlers/handleLoginrequest';
import rootReducers from './reducers/rootReducer';
import getAllRecipes from './actions/requestHandlers/getAllRecipes';
import { getFavorites } from './actions/requestHandlers/handleUserFavorites';
import { handleGetUserProfile } from './actions/requestHandlers/handleUserProfile';
import './styles/sass/index.scss';

const store = createStore(
  rootReducers,
  compose(
    applyMiddleware(thunk),
    reduxReset(),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

if (localStorage.token) {
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
        <App />
      </BrowserRouter>
    </Provider>
  ),
  document.getElementById('app')

);
