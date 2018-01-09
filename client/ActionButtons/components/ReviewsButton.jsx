import React from 'react';
import PropTypes from 'prop-types';
import '../buttons.scss';

const propTypes = {
  reviews: PropTypes.number
};

/**
 * @description displays review button
 * @param {object} props - React props
 * @returns {ReactElement} markup
 */
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
