import React from 'react';
import PropTypes from 'prop-types';

import Review from './Review';
import '../reviews.scss';


const propTypes = {
  reviews: PropTypes.arrayOf(PropTypes.any).isRequired
};

/**
 * @description displays list of reviews
 * @returns {ReactElement} markup
 */
const ListReviews = ({ reviews }) => (
  <div className="review-list">
    <h4 >Reviews</h4>
    {reviews.length < 1 && <span className="no-reviews">No reviews yet!</span>}
    <div className="row">
      {reviews.map(review => (
        <div key={review.id} className="col s12 m12 l6">
          <Review review={review} />
        </div>
      ))
      }
    </div>
  </div>
);

ListReviews.propTypes = propTypes;

export default ListReviews;
