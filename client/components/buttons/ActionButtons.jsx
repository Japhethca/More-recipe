import React from 'react';
import PropTypes from 'prop-types';
import FavoritesButton from './FavoritesButton';
import DownvoteButton from './DownvoteButton';
import ReviewButton from './ReviewButton';
import UpvoteButton from './UpvoteButton';
import './buttons.scss';

const propTypes = {
  recipe: PropTypes.objectOf(PropTypes.any).isRequired,
  reviews: PropTypes.arrayOf(PropTypes.object).isRequired,
  favorites: PropTypes.arrayOf(PropTypes.object).isRequired,
  setFavorites: PropTypes.func.isRequired,
  removeFavorite: PropTypes.func.isRequired
};


const ActionButtons = ({
  recipe, reviews, favorites, setFavorites, removeFavorite
}) => (
  <div>
    <ul className="btn-list">
      <li>
        <ReviewButton
          recipe={recipe}
          reviews={reviews}
          favorites={favorites}
          setFavorites={setFavorites}
          removeFavorite={removeFavorite}
        />
      </li>
      <li><UpvoteButton recipe={recipe} /></li>
      <li><DownvoteButton recipe={recipe} /></li>
      <li><FavoritesButton recipe={recipe} favorites={favorites} /></li>
    </ul>
  </div>
);


ActionButtons.propTypes = propTypes;

export default ActionButtons;
