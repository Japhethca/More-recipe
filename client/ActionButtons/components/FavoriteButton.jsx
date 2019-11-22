import React from 'react';
import PropTypes from 'prop-types';
import classname from 'classnames';


const propTypes = {
  isInFavorites: PropTypes.func.isRequired,
  onFavoriteClick: PropTypes.func.isRequired,
};

/**
 * @description displays Favorites button icon
 * @param {object} props - React props
 * @returns {ReactElement} markup
 */
const FavoritesButton = props => (
  <div className="action-btns">
    <button
      onClick={props.onFavoriteClick}
      className={classname({
        favorite: props.isInFavorites(),
        '': !props.isInFavorites()
      })}
    >
      <i className={classname('material-icons')}>favorite_border</i>
    </button>
  </div>
);


FavoritesButton.propTypes = propTypes;


export default FavoritesButton;
