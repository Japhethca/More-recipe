import React from 'react';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';

import Reviews from '../../reviews';
import ActionButtons from '../../actionButtons';
import '../styles/singleRecipe.scss';

const propTypes = {
  recipe: PropTypes.objectOf(PropTypes.any).isRequired,
};

const SingleRecipe = ({ recipe }) => {
  const {
    name, ingredients, description, direction, image, author
  } = recipe;

  return (
    <div className="recipe-details container">
      <div >
        <h4 className="recipe-title"> {name} </h4>
        <hr className="hr-header" />
      </div>
      <div className="row" >
        <div className="col s12 m6">
          <img
            className="responsive-img center"
            src={image || 'http://res.cloudinary.com/dcmxbxzyj/image/upload/v1511526912/recipe-card-placeholder_ta9ikp.jpg'}
            alt=""
          />
          <p className="description-text" >{description} </p>
          <div id="action-btns">
            {recipe &&
              <ActionButtons
                recipe={recipe}
              />
             }
          </div>
          <span className="recipe-author">Recipe by <span>{author.username}</span> </span>

        </div>
        <div className="col s12 m6">
          <div className="recipe-items">
            <h4> Recipe Ingredients </h4>
            {ReactHtmlParser(ingredients)}
          </div>
          <div className="recipe-items">
            <h4> How To Prepare </h4>
            {ReactHtmlParser(direction)}
          </div>
        </div>
      </div>
      <hr className="hr-line" />
      <Reviews
        recipe={recipe}
      />
    </div>
  );
};

SingleRecipe.propTypes = propTypes;


export default SingleRecipe;
