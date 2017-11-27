import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Review from './Review';
import AddReview from './AddReview';
import './reviewBox.scss';


const propTypes = {
  recipe: PropTypes.objectOf(PropTypes.any).isRequired,
  reviews: PropTypes.arrayOf(PropTypes.object).isRequired
};

const Reviews = (props) => {
  const { recipe } = props;
  const reviews = props.reviews.filter(review => recipe.id === review.recipeId);
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

const mapStateToProps = state => ({
  reviews: state.reviews
});

export default connect(mapStateToProps, { })(Reviews);
