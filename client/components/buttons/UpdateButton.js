import React, { Component } from 'react';
import PropTypes from 'prop-types';

class UpdateButton extends Component {
  onClick(e){    
    this.props.history.push('/recipe/update', this.props.recipe)
  }
  render() {
    return (
      <div>
        <button onClick={this.onClick.bind(this)} className='btn-floating blue waves-effect waves-light'>
          <i className='material-icons right'>edit</i>  
        </button>
      </div>
    )
  }
}

UpdateButton.propTypes = {
  history: PropTypes.object.isRequired,
  recipe: PropTypes.object.isRequired
};

export default UpdateButton