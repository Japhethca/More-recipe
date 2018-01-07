import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

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
    <span className="meta-date">{moment(review.createdAt).fromNow()}</span>
    <hr />
    <p className="review-content">
      {review.content}
    </p>
  </div>
);

Review.propTypes = propTypes;

export default Review;
