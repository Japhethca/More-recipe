import React, { Component } from 'react'
import PropTypes from 'prop-types'

class FlashMessage extends Component {

  render() {
    console.log(this.props.message);
    return (
      <div className='card-title green white-text'>
        {this.props.message}
      </div>
    )
  }
}
FlashMessage.proptypes = {
  message: PropTypes.object.isRequired 
}
export default FlashMessage;
