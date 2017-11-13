import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FavoritesButton from './FavoritesButton';
import DownvoteButton from './DownvoteButton';
import ReviewButton from './ReviewButton';
import UpvoteButton from './UpvoteButton';
import './buttons.scss';

const propTypes = {
  recipe: PropTypes.object.isRequired,
  reviews: PropTypes.array.isRequired,
  favorites: PropTypes.array.isRequired,
  setFavorites: PropTypes.func.isRequired,
  removeFavorite: PropTypes.func.isRequired
}

class ActionButtons extends Component {
  render() {
    const {recipe, reviews, favorites, setFavorites, removeFavorite} = this.props;
    return (
      <div>
        <ul className='btn-list'>
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
  }
}

ActionButtons.propTypes = propTypes;

export default ActionButtons;
