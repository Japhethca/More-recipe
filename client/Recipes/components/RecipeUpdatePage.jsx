import React from 'react';
import PropTypes from 'prop-types';

import UpdateRecipe from '../containers/CreateUpdateRecipe';

/**
 * @description renders recipe update page
 * @param {Object} props
 * @returns {ReactElement} html markup
 */
const RecipeUpdatePage = ({ location, history }) => {
  if (!location.state) history.push('/my-recipes');
  return (
    <UpdateRecipe
      title="Update Recipe"
      type="update"
      recipeUpdateData={location.state}
    />
  );
};

RecipeUpdatePage.propTypes = {
  location: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired
};

export default RecipeUpdatePage;
