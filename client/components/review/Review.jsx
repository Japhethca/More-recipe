import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UserDetails from '../user/UserDetail';
import './reviewBox.scss';


const propTypes = {
  review: PropTypes.objectOf(PropTypes.any).isRequired
};

const Review = (props) => {
  const { review } = props;
  return (
    <div className="my-review z-depth-3">
      <div>
        <UserDetails user={review.User} />
        <span className="meta-date">{new Date(review.createdAt).toDateString()}</span>
      </div>
      <hr />
      <p>
        {review.content}
      </p>
    </div>
  );
};

Review.propTypes = propTypes;

export default Review;
