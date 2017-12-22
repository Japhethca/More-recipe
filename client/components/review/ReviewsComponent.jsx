import React from 'react';
import PropTypes from 'prop-types';

import Review from './Review';
import AddReview from './AddReview';
import './reviewBox.scss';


const propTypes = {
  recipe: PropTypes.objectOf(PropTypes.any).isRequired,
};

const Reviews = (props) => {
  const { recipe } = props;
  const reviews = props.recipe.Reviews || [];

  return (
    <div className="reviews-page" >
      <h4 >Reviews</h4>
      <div>
        <div className="row">
          {reviews.map(review => (
            <div key={review.id} className="col s12 m4">
              <Review review={review} />
            </div>
              ))}
        </div>
        <AddReview recipe={recipe} />
      </div>
    </div>
  );
};

Reviews.propTypes = propTypes;


export default Reviews;
