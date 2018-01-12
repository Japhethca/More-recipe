import React from 'react';
import PropTypes from 'prop-types';


const propTypes = {
  upvotes: PropTypes.number.isRequired,
  upvote: PropTypes.func.isRequired,
};

/**
 * @description displays upvote button
 * @param {object} props - React props
 * @returns {ReactElement} markup
 */
const UpvoteButton = ({ upvote, upvotes }) => (
  <div className="action-btns" title="Upvotes">
    <button onClick={upvote} className="">
      <i className="material-icons">thumb_up</i>&nbsp;
      {upvotes}
    </button>
  </div>
);

UpvoteButton.propTypes = propTypes;

export default UpvoteButton;
