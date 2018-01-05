import React from 'react';
import PropTypes from 'prop-types';

import '../reviews.scss';


const propTypes = {
  review: PropTypes.objectOf(PropTypes.any).isRequired
};

/**
 * @description displays single review
 * @returns {ReactElement} markup
 */
const Review = ({ review }) => (
  <div className="single-review z-depth-2">
    <span className="user">{review.User.username}</span>
    <span className="meta-date">{new Date(review.createdAt).toDateString()}</span>
    <hr />
    <p className="review-content">
      {review.content}
    </p>
  </div>
);

Review.propTypes = propTypes;

export default Review;
