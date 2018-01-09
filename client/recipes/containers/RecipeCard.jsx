import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import swal from 'sweetalert';

import Card from '../components/Card';
import { handleDeleteRecipe, handleRemoveFromFavorites } from '../actions';

/**
 * @class RecipeCard
 * @extends {Component}
 */
class RecipeCard extends Component {
  /**
   * @description Creates an instance of RecipeCard.
   * @param {object} props
   * @memberof RecipeCard
   */
  constructor(props) {
    super(props);
    this.state = {
      recipe: this.props.recipe,
    };
  }

  /**
   * @param {object} nextProps
   * @memberof RecipeCard
   * @return {undefined}
   */
  componentWillReceiveProps(nextProps) {
    if (this.props.recipe !== nextProps.recipe) {
      this.setState({ recipe: nextProps.recipe });
    }
  }

  /**
   * @description handles removing recipe from favorites
   * @memberof RecipeCard
   * @returns {undefined}
   */
  onRemoveFavoriteClick = () => {
    swal('Are you sure you want to remove this recipe from your Favorites?', {
      dangerMode: true,
      buttons: ['No', 'Yes'],
    }).then((value) => {
      if (value) {
        this.props.handleRemoveFromFavorites(this.state.recipe.id);
      }
    });
  }

  /**
  * @description handles deleting of recipe
  * @memberof RecipeCard
  * @returns {undefined}
  */
  handleDeleteClick = () => {
    swal('Are you sure you want to delete this recipe?', {
      dangerMode: true,
      buttons: ['No', 'Yes'],
    }).then((value) => {
      if (value) {
        this.props.handleDeleteRecipe(this.state.recipe.id);
      }
    });
  }

/**
 * @description click event for handling recipe update
 * @memberof RecipeCard
 * @returns {undefined}
 */
handleUpdateClick = () => {
  this.props.history.push(`/update/${this.state.recipe.id}`, this.state.recipe);
}

/**
 * @description renders recipe card
 * @returns {reactElement} - html markup
 */
render() {
  return (
    <Card
      showModifyButtons={this.props.showModifyButtons}
      showRemoveFavorite={this.props.showRemoveFavorite}
      onRemoveFavoriteClick={this.onRemoveFavoriteClick}
      showActionBtns={this.props.showActionBtns}
      onDeleteClick={this.handleDeleteClick}
      onUpdateClick={this.handleUpdateClick}
      recipe={this.state.recipe}
    />
  );
}
}

RecipeCard.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  handleDeleteRecipe: PropTypes.func.isRequired,
  handleRemoveFromFavorites: PropTypes.func.isRequired,
  showModifyButtons: PropTypes.bool,
  showActionBtns: PropTypes.bool,
  showRemoveFavorite: PropTypes.bool,

};

RecipeCard.defaultProps = {
  showModifyButtons: false,
  showActionBtns: true,
  showRemoveFavorite: false
};

const mapStateToProps = state => ({
  favorites: state.recipeReducer.favorites
});


export default withRouter(connect(
  mapStateToProps,
  {
    handleDeleteRecipe,
    handleRemoveFromFavorites
  }
)(RecipeCard));

