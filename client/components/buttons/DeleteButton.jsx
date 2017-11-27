import React from 'react';
import PropTypes from 'prop-types';
import swal from 'sweetalert';


const propTypes = {
  handleDeleteRecipe: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired
};

const DeleteButton = ({ handleDeleteRecipe, id }) => {
  const onClick = () => {
    swal('Are you sure you want to delete this recipe?', {
      dangerMode: true,
      buttons: ['No', 'Yes'],
    }).then((value) => {
      if (value) {
        handleDeleteRecipe(id);
      }
    });
  };

  return (
    <div>
      <button onClick={onClick} className="btn-floating white waves-effect waves-red right">
        <i className="material-icons red-text ">delete</i>
      </button>
    </div>
  );
};

DeleteButton.propTypes = propTypes;

export default DeleteButton;
