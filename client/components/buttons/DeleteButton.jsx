import React, { Component } from 'react';
import PropTypes from 'prop-types';
import swal from 'sweetalert';


class DeleteButton extends Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }
  onClick(e) {
    swal('Are you sure you want to delete this recipe?', {
      dangerMode: true,
      buttons: ['No', 'Yes'],
    }).then((value) => {
      if (value) {
        this.props.handleDeleteRecipe(this.props.id);
      }
    });
  }
  render() {
    return (
      <div>
        <button onClick={this.onClick} className="btn-floating white waves-effect waves-red right">
          <i className="material-icons red-text ">delete</i>
        </button>
      </div>
    );
  }
}

DeleteButton.propTypes = {
  handleDeleteRecipe: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired
};

export default DeleteButton;
