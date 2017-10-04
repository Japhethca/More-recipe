import { render } from 'react-dom';
import React from 'react';
import {BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import jwt from 'jsonwebtoken';
import thunk from 'redux-thunk';
import Home from './containers/Home';
import SignUpPage from './containers/SignUpPage';
import LoginPage from './containers/LoginPage';
import MyRecipesPage from './containers/MyRecipesPage';
import RecipeDetailsPage from './containers/RecipeDetailsPage';
import RecipeUpdatePage from './containers/RecipeUpdatePage';
import NotFoundPage from './containers/404Page';                                                           
import setAuthorizationToken from './utils/setAuthorization';
import { setCurrentUser } from './actions/requestHandlers/handleLoginrequest';
import rootReducers from './reducers/rootReducer';


const store = createStore(
  rootReducers,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f    
  )
);

if (localStorage.token){
  setAuthorizationToken(localStorage.token);
  store.dispatch(setCurrentUser(jwt.decode(localStorage.token)));  
}

render((

  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path='/recipe/update'  component={RecipeUpdatePage} /> 
        <Route path='/recipe/:id'  component={RecipeDetailsPage} /> 
        <Route path='/signin' component={LoginPage} />
        <Route path='/signup' component={SignUpPage} />
        <Route path='/myrecipes' component={MyRecipesPage} />
        <Route path='/' exact={true} component={Home} />
        <Route component={NotFoundPage} />  
      </Switch>
    </BrowserRouter>
  </Provider>
),
  document.getElementById('app')

);
