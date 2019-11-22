import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import ReduxToastr from 'react-redux-toastr';

import NavigationBar from '../common/NavigationBar';
import Footer from '../common/Footer';
import AuthenticateRoute from '../authentication/containers/AuthenticateRoute';
import LoginPage from '../authentication/containers/LoginPage';
import SignupPage from '../authentication/containers/SignupPage';
import HomePage from '../HomePage';
import RecipeUpdatePage from '../Recipes/components/RecipeUpdatePage';
import CreateUpdateRecipe from '../Recipes/containers/CreateUpdateRecipe';
import Dashboard from '../Dashboard';
import SingleRecipePage from '../Recipes/containers/SingleRecipePage';
import SearchPage from '../SearchPage';
import NotFound from '../authentication/components/NotFound';
import '../styles/sass/index.scss';


const propTypes = {
  location: PropTypes.objectOf(PropTypes.any).isRequired
};

const dashboardUrls = [
  '/profile',
  '/my-recipes',
  '/favorites'
];

/**
 * @description main app node
 * @param {Object} props
 * @return {ReactElement} markup
 */
const App = props => (
  <div className="wrapper">
    <NavigationBar />
    <div id="main">
      <ReduxToastr
        timeOut={4000}
        newestOnTop={false}
        preventDuplicates
        position="top-right"
        transitionIn="fadeIn"
        transitionOut="fadeOut"
      />

      <Switch>
        <Route
          path="/create"
          exact
          component={AuthenticateRoute(CreateUpdateRecipe)}
        />
        <Route
          path="/update/:id"
          exact
          component={AuthenticateRoute(RecipeUpdatePage)}
        />
        <Route
          path="/signin"
          exact
          component={LoginPage}
        />
        <Route
          path="/signup"
          exact
          component={SignupPage}
        />
        <Route
          path="/recipe/:nameId"
          exact
          component={AuthenticateRoute(SingleRecipePage)}
        />
        <Route
          path="/recipes"
          exact
          component={AuthenticateRoute(HomePage)}
        />
        <Route
          path="/search"
          exact
          component={AuthenticateRoute(SearchPage)}
        />
        {dashboardUrls.filter(url => props.location.pathname === url)
          .length > 0 ? '' :
          <Route component={NotFound} />}
        <Route component={AuthenticateRoute(Dashboard)} />
      </Switch>
    </div>
    <Footer />
  </div>
);

App.propTypes = propTypes;

export default App;
