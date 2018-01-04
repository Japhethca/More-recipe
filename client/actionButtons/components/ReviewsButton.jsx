import React from 'react';
import PropTypes from 'prop-types';
import '../buttons.scss';

const propTypes = {
  reviews: PropTypes.number
};

const ReviewButton = ({ reviews }) => (
  <span className="action-btns">
    <i className="material-icons">rate_review</i><span id="reivews" > {reviews} </span>
  </span >
);

ReviewButton.propTypes = propTypes;
ReviewButton.defaultProps = {
  reviews: 0
};
export default ReviewButton;
