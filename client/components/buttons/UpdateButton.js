import React, { Component } from 'react'
import PropTypes from 'prop-types'

class UpdateButton extends Component {
  constructor(props) {
    super(props)

    this.onClick = this.onClick.bind(this)
  }
  onClick(e){
    e.preventDefault();
    this.props.history.push('/recipe/update', this.props.recipe)
  }
  render() {
    return (
      <div>
        <button onClick={this.onClick} type='delete' className='btn-floating blue waves-effect waves-light'>
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