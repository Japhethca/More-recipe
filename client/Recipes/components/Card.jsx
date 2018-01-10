
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Link } from 'react-router-dom';

import slugify from '../../utilities/slugify';
import ActionButtons from '../../ActionButtons';

import '../styles/recipeCardStyles.scss';


const propTypes = {
  onDeleteClick: PropTypes.func.isRequired,
  onUpdateClick: PropTypes.func.isRequired,
  onRemoveFavoriteClick: PropTypes.func.isRequired,
  recipe: PropTypes.objectOf(PropTypes.any).isRequired,
  showActionBtns: PropTypes.bool,
  showModifyButtons: PropTypes.bool,
  showRemoveFavorite: PropTypes.bool
};

/**
 * @description displays a card of recipe
 * @param {Object} props
 * @returns {ReactElement} html markup
 */
const Card = (props) => {
  const {
    recipe, showActionBtns, showModifyButtons, onDeleteClick,
    onUpdateClick, showRemoveFavorite, onRemoveFavoriteClick
  } = props;

  /**
   * @description renders delete button
   * @returns {DomElement} - html markup
   */
  const renderDelete = () => (
    <button onClick={onDeleteClick} className="btn-floating white waves-effect waves-red right">
      <i className="material-icons red-text ">delete</i>
    </button>
  );

  /**
   * @description renders update button
   * @returns {DomElement} - markup
   */
  const renderUpdate = () => (
    <button
      className="btn-floating white waves-effect waves-blue modal-trigger"
      onClick={onUpdateClick}
    >
      <i className="material-icons blue-text">edit</i>
    </button>
  );

  const nameSlug = slugify(recipe.name, '-');

  return (
    <div className="row " id="recipe-card">
      <div className="card col s12">
        <Link
          to={`/recipe/${nameSlug}-${recipe.id}`}
          className="card-image"
          href={`/recipe/${nameSlug}-${recipe.id}`}
        >
          <img
            src={recipe.image
          || 'http://res.cloudinary.com/dcmxbxzyj/image/upload/v1511526912/recipe-card-placeholder_ta9ikp.jpg'}
            alt={recipe.name}
            className="responsive-img recipe-image"
          />
          <h5 className="ellipses">{recipe.name}</h5>
        </Link>
        <span className="recipe-author">Recipe by <span>{recipe.author.username}</span> - {moment(recipe.createdAt).fromNow()}</span>
        {
        showActionBtns &&
        <div className="card-action">
          <ActionButtons
            recipe={recipe}
            hidden
          />
        </div>
      }
        {
        showModifyButtons &&
        <div className="card-action">
          {renderUpdate()}
          {renderDelete()}
        </div>
      }
        {
        showRemoveFavorite &&

        <div className="card-action">
          <button className="btn red white-text" onClick={onRemoveFavoriteClick}>
          Remove
          </button>
        </div>
      }
      </div>
    </div>
  );
};

Card.propTypes = propTypes;

Card.defaultProps = {
  showActionBtns: true,
  showModifyButtons: false,
  showRemoveFavorite: false
};

export default Card;
