import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  addToFavorites,
  removeFavorite,
  handleDownvote,
  handleUpvote } from '../actions';
import FavoritesButton from '../components/FavoriteButton';
import DownvoteButton from '../components/DownvoteButton';
import ReviewButton from '../components/ReviewsButton';
import UpvoteButton from '../components/UpvoteButton';
import '../buttons.scss';

const propTypes = {
  recipe: PropTypes.objectOf(PropTypes.any).isRequired,
  favorites: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleUpvote: PropTypes.func.isRequired,
  handleDownvote: PropTypes.func.isRequired,
  addToFavorites: PropTypes.func.isRequired,
  removeFavorite: PropTypes.func.isRequired
};


class ActionButtons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: this.props.favorites
    };
  }

  componentDidMount = () => {
    this.isInFavorites();
  }


  componentWillReceiveProps(nextProps) {
    if (nextProps.favorites !== this.props.favorites) {
      this.setState({ favorites: nextProps.favorites });
    }
  }


  onFavoriteClick = (event) => {
    event.preventDefault();
    this.toggleFavorite();
    if (!this.isInFavorites()) {
      this.props.addToFavorites(this.props.recipe);
    } else {
      this.props.removeFavorite(this.props.recipe.id);
    }
  }

  isInFavorites = () => {
    const checkFavorite = this.state.favorites.filter(favorite => favorite.id === this.props.recipe.id);
    if (checkFavorite.length > 0) {
      return true;
    }
    return false;
  }

  toggleFavorite = () => {
    if (this.state.isFavorite) {
      this.setState({ isFavorite: false });
    } else {
      this.setState({ isFavorite: true });
    }
  }

  downvote = (event) => {
    event.preventDefault();
    this.props.handleDownvote(this.props.recipe.id);
  };

  upvote = (event) => {
    event.preventDefault();
    this.props.handleUpvote(this.props.recipe.id);
  };

  render() {
    const { recipe } = this.props;
    return (
      <div>
        <ul className="btn-list">
          <li><ReviewButton reviews={recipe.Reviews && recipe.Reviews.length} /></li>
          <li><UpvoteButton upvotes={recipe.upvotes} upvote={this.upvote} /></li>
          <li><DownvoteButton downvotes={recipe.downvotes} downvote={this.downvote} /></li>
          <li><FavoritesButton
            isInFavorites={this.isInFavorites}
            onFavoriteClick={this.onFavoriteClick}
          />
          </li>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  favorites: state.recipeReducer.favorites
});


ActionButtons.propTypes = propTypes;


export default connect(mapStateToProps, {
  addToFavorites,
  removeFavorite,
  handleDownvote,
  handleUpvote
})(ActionButtons);
