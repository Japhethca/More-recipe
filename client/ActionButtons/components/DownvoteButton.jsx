import React from 'react';
import PropTypes from 'prop-types';
import '../buttons.scss';


const propTypes = {
  downvotes: PropTypes.number.isRequired,
  downvote: PropTypes.func.isRequired,
};

/**
 * @description displays downvote button
 * @param {object} props - React props
 * @returns {ReactElement} markup
 */
const DownvoteButton = ({ downvote, downvotes }) => (
  <div className="action-btns" title="Downvotes">
    <button onClick={downvote}>
      <i className="material-icons">thumb_down</i>&nbsp;
      {downvotes}
    </button>
  </div>
);

DownvoteButton.propTypes = propTypes;


export default DownvoteButton;
