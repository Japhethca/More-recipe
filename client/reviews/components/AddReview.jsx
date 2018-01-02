import React from 'react';
import PropTypes from 'prop-types';


const propTypes = {
  content: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

const AddReview = ({ content, onChange, onSubmit }) => (
  <form onSubmit={onSubmit} className="review-form">
    <div className="review-input" >
      <textarea
        type="text"
        name="content"
        onChange={onChange}
        id="reviewText"
        value={content}
        placeholder="add your reviews here"
        className=""
      />
    </div>
    <div >
      <button type="submit" className="btn-class" >Post Review</button>
    </div>
  </form>
);

AddReview.propTypes = propTypes;

export default AddReview;
