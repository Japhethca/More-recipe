import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ReduxToastr from 'react-redux-toastr';

import NavigationBar from '../components/navigation/NavigationBar';
import Footer from '../components/navigation/Footer';
import Home from './Home';
import Dashboard from './Dashboard';
import RecipeDetailsPage from './RecipeDetailsPage';
import Authenticate from '../components/common/Authenticate';
import SearchResultPage from './SearchResultPage';
import LoadingIndicator from '../components/common/LoadingIndicator';
import '../styles/sass/index.scss';

const App = () => (
  <div className="wrapper">
    <NavigationBar />
    <div id="main">
      <LoadingIndicator />
      <ReduxToastr
        timeOut={4000}
        newestOnTop={false}
        preventDuplicates
        position="top-right"
        transitionIn="fadeIn"
        transitionOut="fadeOut"
      />

      <Switch>
        <Route path="/" exact component={Authenticate(Home)} />
        <Route path="/recipe/:nameId" exact component={Authenticate(RecipeDetailsPage)} />
        <Route path="/search/:query" exact component={Authenticate(SearchResultPage)} />
        <Dashboard />
      </Switch>
    </div>
    <Footer />
  </div>

);


export default App;
