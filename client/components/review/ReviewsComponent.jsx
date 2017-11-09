import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Review from './Review';
import AddReview from './AddReview';
import './reviewBox.scss';


const propTypes = {
  recipe: PropTypes.object.isRequired
};

class Reviews extends Component {
  render() {
    const { recipe } = this.props;
    const reviews = this.props.reviews.filter(review => recipe.id === review.recipeId);
    return (
      <div className="reviews-page" >
        <h4 >Reviews</h4>
        <div>
          <AddReview recipe={recipe} />
          <div className="row">
            {reviews.map((review, id) => (
              <div className="col s12 m4">
                <Review key={id} review={review} />
              </div>
              ))}
          </div>
        </div>
      </div>
    );
  }
}

Reviews.propTypes = propTypes;

const mapStateToProps = state => ({
  reviews: state.reviews
});

export default connect(mapStateToProps, { })(Reviews);
