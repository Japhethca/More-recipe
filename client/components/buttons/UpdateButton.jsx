import React, { Component } from 'react';
import PropTypes from 'prop-types';


const propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  recipe: PropTypes.objectOf(PropTypes.any).isRequired
};

class UpdateButton extends Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }
  onClick() {
    this.props.history.push('/recipe/update', this.props.recipe);
  }

  render() {
    return (
      <div>
        <button onClick={this.onClick} className="btn-floating white waves-effect waves-blue">
          <i className="material-icons blue-text">edit</i>
        </button>
      </div>
    );
  }
}

UpdateButton.propTypes = propTypes;

export default UpdateButton;
