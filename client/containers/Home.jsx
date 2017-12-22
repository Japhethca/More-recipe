import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import getRecipes from '../actions/requestHandlers/getAllRecipes';
import getFavorites from '../actions/requestHandlers/handleUserFavorites';
import Recipes from '../components/recipe/Recipes';


const propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  recipes: PropTypes.arrayOf(PropTypes.any).isRequired,
  favorites: PropTypes.arrayOf(PropTypes.any).isRequired,
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  getRecipes: PropTypes.func.isRequired,
};

const Home = props => (
  <div>
    <div className="content">
      <Recipes
        history={props.history}
        recipes={props.recipes}
        user={props.user}
        favorites={props.favorites}
        getRecipes={props.getRecipes}
      />
    </div>
  </div>
);

Home.propTypes = propTypes;

const mapStateToProps = state => ({
  recipes: state.recipes,
  user: state.auth.user,
  favorites: state.favorites
});

export default connect(mapStateToProps, { getRecipes, getFavorites })(Home);

