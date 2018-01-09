import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  handleDownvote,
  handleUpvote } from '../actions';
import { handleRemoveFromFavorites, handleAddToFavorites } from '../../Recipes/actions';
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
  handleAddToFavorites: PropTypes.func.isRequired,
  handleRemoveFromFavorites: PropTypes.func.isRequired
};

/**
 * @description container for holding buttons
 * @class ActionButtons
 * @extends {Component}
 */
class ActionButtons extends Component {
  /**
   * @description Creates an instance of ActionButtons.
   * @param {object} props - React props
   * @memberof ActionButtons
   */
  constructor(props) {
    super(props);
    this.state = {
      favorites: this.props.favorites
    };
  }
  /**
   * @description react life cycle function
   * @memberof ActionButtons
   * @return {undefined}
   */
  componentDidMount = () => {
    this.isInFavorites();
  }

  /**
   * @param {object} nextProps - react life cycle function
   * @memberof ActionButtons
   *  @return {undefined}
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.favorites !== this.props.favorites) {
      this.setState({ favorites: nextProps.favorites });
    }
  }

  /**
   * handles favorite click event
   * @param {SytheticEvent} event - onclick event
   * @memberof ActionButtons
   * @returns {undefined}
   */
  onFavoriteClick = (event) => {
    event.preventDefault();
    this.toggleFavorite();
    if (!this.isInFavorites()) {
      this.props.handleAddToFavorites(this.props.recipe);
    } else {
      this.props.handleRemoveFromFavorites(this.props.recipe.id);
    }
  }

  /**
   * @memberof ActionButtons
   * @returns {boolean} return true/false
   */
  isInFavorites = () => {
    const checkFavorite = this.state.favorites
      .filter(favorite => favorite.id === this.props.recipe.id);
    if (checkFavorite.length > 0) {
      return true;
    }
    return false;
  }

  /**
   * @description handles toggling of favorite state
   * @returns {undefined}
   * @memberof ActionButtons
   */
  toggleFavorite = () => {
    if (this.state.isFavorite) {
      this.setState({ isFavorite: false });
    } else {
      this.setState({ isFavorite: true });
    }
  }

  /**
   * @description handles click event for upvoting recipe
   * @param {SynthenticEvent} event - onClick event
   * @returns {undefined}
   * @memberof ActionButtons
   */
  downvote = (event) => {
    event.preventDefault();
    this.props.handleDownvote(this.props.recipe.id);
  };

  /**
   * @description handles click event for upvoting recipe
   * @param {SynthenticEvent} event - onClick event
   * @returns {undefined}
   * @memberof ActionButtons
   */
  upvote = (event) => {
    event.preventDefault();
    this.props.handleUpvote(this.props.recipe.id);
  };

  /**
   * @description renders buttons
  * @returns {ReactElement} markup
  * @memberof ActionButtons
  */
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
  favorites: state.recipeReducer.favorites.payload
});


ActionButtons.propTypes = propTypes;


export default connect(mapStateToProps, {
  handleAddToFavorites,
  handleRemoveFromFavorites,
  handleDownvote,
  handleUpvote
})(ActionButtons);
