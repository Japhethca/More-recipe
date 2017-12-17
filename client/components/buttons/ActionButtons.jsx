import React from 'react';
import PropTypes from 'prop-types';
import FavoritesButton from './FavoritesButton';
import DownvoteButton from './DownvoteButton';
import ReviewButton from './ReviewButton';
import UpvoteButton from './UpvoteButton';
import './buttons.scss';

const propTypes = {
  recipe: PropTypes.objectOf(PropTypes.any).isRequired,
  favorites: PropTypes.arrayOf(PropTypes.object).isRequired
};


const ActionButtons = (props) => {
  const {
    recipe, favorites
  } = props;

  return (
    <div>
      <ul className="btn-list">
        <li><ReviewButton reviews={recipe.Reviews} /></li>
        <li><UpvoteButton recipe={recipe} /></li>
        <li><DownvoteButton recipe={recipe} /></li>
        <li><FavoritesButton recipe={recipe} favorites={favorites} /></li>
      </ul>
    </div>
  );
};


ActionButtons.propTypes = propTypes;

export default ActionButtons;
