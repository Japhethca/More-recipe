import React from 'react';
import { Route, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import MyRecipesPage from './MyRecipesPage';
import FavoritesPage from './FavoritesPage';
import UserProfilePage from './UserProfilePage';
import Authenticate from '../components/common/Authenticate';
import CreateRecipe from '../components/myRecipe/RecipeForm';
import UpdateRecipe from '../containers/RecipeUpdatePage';
import '../components/profile/profile.scss';


const Dashboard = props => (
  <div>
    <UserProfilePage profile={props.profile} />
    <div className="container row">
      <div className="col s12 m12 l3 sidebar">
        <ul>
          <li><NavLink to="/my-recipes" activeClassName="active" href>My Recipes</NavLink></li>
          <li><NavLink to="/favorites" activeClassName="active" href>My Favorites</NavLink></li>
          <li><NavLink to="/create" activeClassName="active" href>Add Recipe</NavLink></li>
          <li><NavLink to="/logout" activeClassName="active" href>Logout</NavLink></li>
        </ul>
      </div>
      <div className="col s12 m12 l9 content">
        <Route path="/favorites" exact component={Authenticate(FavoritesPage)} />
        <Route path="/my-recipes" exact component={Authenticate(MyRecipesPage)} />
        <Route path="/create" exact component={Authenticate(CreateRecipe)} />
        <Route path="/update" exact component={Authenticate(UpdateRecipe)} />

      </div>
    </div>
  </div>
);


Dashboard.propTypes = {
  profile: PropTypes.shape(PropTypes.object).isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { })(Dashboard);
