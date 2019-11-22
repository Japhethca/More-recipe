import React from 'react';
import PropTypes from 'prop-types';
import '../buttons.scss';

const propTypes = {
  reviews: PropTypes.number,
  hidden: PropTypes.bool
};

const defaultProps = {
  reviews: 0,
  hidden: false
};

/**
 * @description displays review button
 * @param {object} props - React props
 * @returns {ReactElement} markup
 */
const ReviewButton = ({ reviews, hidden }) => (
  <span
    className={`action-btns ${hidden && 'hide'}`}
    title="Reviews"
  >
    <i className="material-icons">rate_review</i>
    <span id="reivews" > {reviews} </span>
  </span >
);

ReviewButton.propTypes = propTypes;
ReviewButton.defaultProps = defaultProps;

export default ReviewButton;
