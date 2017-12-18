import React from 'react';
import PropTypes from 'prop-types';
import './buttons.scss';

const propTypes = {
  reviews: PropTypes.arrayOf(PropTypes.object).isRequired
};

const ReviewButton = (props) => {
  const reviews = props.reviews || [];
  return (
    <div className="action-btns">
      <span >
        <i className="material-icons">rate_review</i><span id="reivews" > {reviews.length || 0 } </span>
      </span >
    </div>
  );
};

ReviewButton.propTypes = propTypes;

export default ReviewButton;
