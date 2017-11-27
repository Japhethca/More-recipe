import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import RecipeUpdate from '../myRecipe/RecipeUpdate';
import handleRecipeUpdate from '../../actions/requestHandlers/handleRecipeUpdate';


const propTypes = {
  handleRecipeUpdate: PropTypes.func.isRequired,
  recipe: PropTypes.objectOf(PropTypes.any).isRequired
};

class UpdateButton extends Component {
  componentDidMount() {
    $('.modal').modal({
      dismissible: false
    });
  }

  render() {
    return (
      <div>
        <button
          data-target={this.props.recipe.id}
          className="btn-floating white waves-effect waves-blue modal-trigger"
        >
          <i className="material-icons blue-text">edit</i>
        </button>
        <RecipeUpdate
          modal="modal"
          id={this.props.recipe.id}
          modalContent="modal-content"
          handleRecipeUpdate={this.props.handleRecipeUpdate}
          recipe={this.props.recipe}
        />
      </div>
    );
  }
}

UpdateButton.propTypes = propTypes;

export default connect(null, { handleRecipeUpdate })(UpdateButton);
