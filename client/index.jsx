import { render } from 'react-dom';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import jwt from 'jsonwebtoken';
import thunk from 'redux-thunk';
import reduxReset from 'redux-reset';
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
import Authenticate from '../client/components/common/Authenticate';
import UserProfilePage from './containers/UserProfilePage';
import FavoritesPage from './containers/FavoritesPage';
import getAllReviews from './actions/requestHandlers/getReviews';
import getAllRecipes from './actions/requestHandlers/getAllRecipes';
import { getFavorites } from './actions/requestHandlers/handleUserFavorites';
import { handleGetUserProfile } from './actions/requestHandlers/handleUserProfile';
import LandingPage from './containers/LandingPage';
import SearchResultPage from './containers/SearchResultPage';
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
  store.dispatch(getAllReviews());
  store.dispatch(getAllRecipes());
  store.dispatch(handleGetUserProfile());
}

render(
  (

    <Provider store={store}>
      <BrowserRouter>
        <Switch path="/">
          <Route path="/" exact component={Authenticate(Home)} />
          <Route path="/recipe/update" component={Authenticate(RecipeUpdatePage)} />
          <Route path="/recipe/:id" component={Authenticate(RecipeDetailsPage)} />
          <Route path="/myrecipes" component={Authenticate(MyRecipesPage)} />
          <Route path="/profile" component={Authenticate(UserProfilePage)} />
          <Route path="/profile/edit" component={Authenticate(UserProfilePage)} />
          <Route path="/favorites" component={Authenticate(FavoritesPage)} />
          <Route path="/search" component={Authenticate(SearchResultPage)} />
          <Route path="/signin" component={LoginPage} />
          <Route path="/landing" component={LandingPage} />
          <Route path="/signup" component={SignUpPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </BrowserRouter>
    </Provider>
  ),
  document.getElementById('app')

);
