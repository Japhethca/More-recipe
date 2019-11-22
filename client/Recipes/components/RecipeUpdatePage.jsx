import React from 'react';
import PropTypes from 'prop-types';

import CreateUpdateRecipe from '../containers/CreateUpdateRecipe';


const propTypes = {
  location: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired
};

/**
 * @description renders recipe update page
 * @param {Object} props
 * @returns {ReactElement} html markup
 */
const RecipeUpdatePage = ({ location, history }) => {
  if (!location.state) history.push('/my-recipes');
  return (
    <CreateUpdateRecipe
      title="Update Recipe"
      type="update"
      recipeUpdateData={location.state}
    />
  );
};

RecipeUpdatePage.propTypes = propTypes;

export default RecipeUpdatePage;
