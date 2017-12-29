import React from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router-dom';


const propTypes = {
  recipe: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired
};

const UpdateButton = ({ history, recipe }) => (
  <button
    data-target={recipe.id}
    className="btn-floating white waves-effect waves-blue modal-trigger"
    onClick={() => history.push('/update', recipe)}
  >
    <i className="material-icons blue-text">edit</i>
  </button>
);


UpdateButton.propTypes = propTypes;

export default withRouter(UpdateButton);
