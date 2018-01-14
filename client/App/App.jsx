import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ReduxToastr from 'react-redux-toastr';

import NavigationBar from '../common/NavigationBar';
import Footer from '../common/Footer';
import AuthenticateRoute, { LoginPage, SignupPage } from '../authentication';
import HomePage from '../HomePage';
import Dashboard from '../Dashboard';
import SingleRecipePage from '../Recipes/containers/SingleRecipePage';
import SearchPage from '../SearchPage';
import '../styles/sass/index.scss';

/**
 * @description main app node
 * @return {ReactElement} markup
 */
const App = () => (
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
        <Route path="/signin" exact component={LoginPage} />
        <Route path="/signup" exact component={SignupPage} />
        <Route path="/recipe/:nameId" exact component={AuthenticateRoute(SingleRecipePage)} />
        <Route path="/recipes" exact component={AuthenticateRoute(HomePage)} />
        <Route path="/search" exact component={AuthenticateRoute(SearchPage)} />
        <Route component={AuthenticateRoute(Dashboard)} />
      </Switch>
    </div>
    <Footer />
  </div>

);


export default App;
