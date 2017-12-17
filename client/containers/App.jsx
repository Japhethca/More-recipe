import React from 'react';
import { Route, Switch } from 'react-router-dom';

import NavigationBar from '../components/navigation/NavigationBar';
import Home from './Home';
import SignUpPage from './SignUpPage';
import LoginPage from './LoginPage';
import MyRecipesPage from './MyRecipesPage';
import RecipeDetailsPage from './RecipeDetailsPage';
import RecipeUpdatePage from './RecipeUpdatePage';
import NotFoundPage from './404Page';
import Authenticate from '../components/common/Authenticate';
import UserProfilePage from './UserProfilePage';
import FavoritesPage from './FavoritesPage';
import LandingPage from './LandingPage';
import SearchResultPage from './SearchResultPage';

const App = () => (
  <div id="main">
    <NavigationBar />
    <Switch>
      <Route path="/" exact component={Authenticate(Home)} />
      <Route path="/recipe/update" component={Authenticate(RecipeUpdatePage)} />
      <Route path="/recipe/:nameId" component={Authenticate(RecipeDetailsPage)} />
      <Route path="/myrecipes" component={Authenticate(MyRecipesPage)} />
      <Route path="/profile" component={Authenticate(UserProfilePage)} />
      <Route path="/profile/edit" component={Authenticate(UserProfilePage)} />
      <Route path="/favorites" component={Authenticate(FavoritesPage)} />
      <Route path="/search/:query" component={Authenticate(SearchResultPage)} />
      <Route path="/signin" component={LoginPage} />
      <Route path="/landing" component={LandingPage} />
      <Route path="/signup" component={SignUpPage} />
      <Route component={NotFoundPage} />
    </Switch>
  </div>

);


export default App;
