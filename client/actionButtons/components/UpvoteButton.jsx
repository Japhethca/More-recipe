import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import '../buttons.scss';


const propTypes = {
  upvotes: PropTypes.number.isRequired,
  upvote: PropTypes.func.isRequired,
};

const UpvoteButton = ({ upvote, upvotes }) => (
  <div className="action-btns">
    <button onClick={upvote} className="">
      <i className="material-icons">thumb_up</i>&nbsp;
      {upvotes}
    </button>
  </div>
);

UpvoteButton.propTypes = propTypes;

export default UpvoteButton;
