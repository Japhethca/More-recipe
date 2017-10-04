import React, { Component } from 'react'
import PropTypes from 'prop-types'

class DeleteButton extends Component {
  constructor(props) {
    super(props)

    this.onClick = this.onClick.bind(this)
  }
  onClick(e){
    e.preventDefault();
    this.props.handleDeleteRecipe(this.props.id)
  }
  render() {
    return (
      <div>
        <button onClick={this.onClick} type='delete' className='btn-floating red waves-effect waves-light right'>
          <i className='material-icons right'>delete</i>  
        </button>
      </div>
    )
  }
}

DeleteButton.propTypes = {
  handleDeleteRecipe:  PropTypes.func.isRequired,
  id: PropTypes.number.isRequired
}

export default DeleteButton