import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import getRecipe from '../actions/requestHandlers/getRecipe';
import RecipeDetails from '../components/recipeDetails/RecipeDetails';


const propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  favorites: PropTypes.arrayOf(PropTypes.object).isRequired,
  recipe: PropTypes.objectOf(PropTypes.any).isRequired,
  getRecipe: PropTypes.func.isRequired,
};


const RecipeDetailsPage = props => (
  <div className="container">
    <RecipeDetails
      match={props.match}
      recipe={props.recipe}
      favorites={props.favorites}
      getRecipe={props.getRecipe}
    />
  </div>
);

RecipeDetailsPage.propTypes = propTypes;

const mapStateToProps = state => ({
  favorites: state.favorites,
  reviews: state.reviews,
  recipe: state.recipe
});


export default connect(mapStateToProps, { getRecipe })(RecipeDetailsPage);
