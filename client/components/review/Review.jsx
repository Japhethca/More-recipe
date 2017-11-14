import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UserDetails from '../user/UserDetail';
import './reviewBox.scss';


const propTypes = {
  review: PropTypes.objectOf(PropTypes.any).isRequired
};

class Review extends Component {
  render() {
    const { review } = this.props;
    return (
      <div className="my-review z-depth-3">
        <div>
          <UserDetails userId={review.userId} />
          <span className="meta-date">{new Date(review.createdAt).toDateString()}</span>
        </div>
        <hr />
        <p>
          {review.content}
        </p>
      </div>
    );
  }
}

Review.propTypes = propTypes;

export default Review;
