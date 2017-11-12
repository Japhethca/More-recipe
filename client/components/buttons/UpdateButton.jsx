import React, { Component } from 'react';
import PropTypes from 'prop-types';


const propTypes = {
  history: PropTypes.object.isRequired,
  recipe: PropTypes.object.isRequired
};

class UpdateButton extends Component {
  onClick() {
    this.props.history.push('/recipe/update', this.props.recipe);
  }

  render() {
    return (
      <div>
        <button onClick={this.onClick.bind(this)} className="btn-floating white waves-effect waves-blue">
          <i className="material-icons blue-text">edit</i>
        </button>
      </div>
    );
  }
}

UpdateButton.propTypes = propTypes;

export default UpdateButton;