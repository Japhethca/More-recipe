import React from 'react';
import PropTypes from 'prop-types';
import RecipeUpdate from '../components/myRecipe/RecipeForm';


const propTypes = {
  location: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

const RecipeUpdatePage = (props) => {
  if (!props.location.state) {
    props.history.push('/my-recipes');
  }
  return (
    <div>
      <div className="container">
        <RecipeUpdate
          title="Update Recipe"
          type="update"
          recipe={props.location.state}
        />
      </div>
    </div>
  );
};


RecipeUpdatePage.propTypes = propTypes;

export default RecipeUpdatePage;
