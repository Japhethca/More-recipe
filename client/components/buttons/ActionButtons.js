import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FavoritesButton from './FavoritesButton';
import DownvoteButton from './DownvoteButton';
import ReviewButton from './ReviewButton';
import UpvoteButton from  './UpvoteButton';
import '../../styles/sass/buttons.scss';



class ActionButtons extends Component {
  render() {
    const {recipe, reviews, favorites, setFavorites, removeFavorite} = this.props;
    return (
      <div>
        <ul className='btn-list center'>
          <li><ReviewButton recipe={recipe} reviews={reviews} 
            favorites={favorites} setFavorites={setFavorites} removeFavorite={removeFavorite} />
            </li>
          <li><UpvoteButton recipe={recipe} /></li>
          <li><DownvoteButton recipe={recipe} /></li>
          <li><FavoritesButton recipe={recipe} favorites={favorites} /></li>
        </ul>
      </div>
    )
  }
}

ActionButtons.propTypes = {
  recipe: PropTypes.object.isRequired,
  reviews: PropTypes.array.isRequired,
  favorites: PropTypes.array.isRequired,
  setFavorites: PropTypes.func.isRequired,
  removeFavorite: PropTypes.func.isRequired
}

export default ActionButtons;