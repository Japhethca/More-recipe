import React from 'react';
import PropTypes from 'prop-types';
import '../buttons.scss';


const propTypes = {
  downvotes: PropTypes.number.isRequired,
  downvote: PropTypes.func.isRequired,
};

const DownvoteButton = ({ downvote, downvotes }) => (
  <div className="action-btns">
    <button onClick={downvote}>
      <i className="material-icons">thumb_down</i>&nbsp;
      {downvotes}
    </button>
  </div>
);

DownvoteButton.propTypes = propTypes;


export default DownvoteButton;
