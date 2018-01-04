import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ReduxToastr from 'react-redux-toastr';

import NavigationBar from '../common/NavigationBar';
import Footer from '../common/Footer';
import Authenticate from '../authentication';
import Home from '../home';
import Dashboard from '../dashboard';
import { SingleRecipePage } from '../recipes';
import SearchResultPage from '../search/containers/SearchResultPage';
import '../styles/sass/index.scss';

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
        <Route path="/" exact component={Authenticate(Home)} />
        <Route path="/recipe/:nameId" exact component={Authenticate(SingleRecipePage)} />
        <Route path="/search" exact component={SearchResultPage} />
        <Route component={Authenticate(Dashboard)} />
      </Switch>
    </div>
    <Footer />
  </div>

);


export default App;
