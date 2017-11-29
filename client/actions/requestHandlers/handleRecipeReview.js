import axios from 'axios';
import { ADD_NEW_REVIEW } from '../types';

/**
 * @param {object} review
 * @returns {object} - action
 */
function addNewReview(review) {
  return {
    type: ADD_NEW_REVIEW,
    review
  };
}

export default (id, data) => dispatch => axios.post(`/api/recipes/${id}/reviews`, data).then((res) => {
  dispatch(addNewReview(res.data.Review));
});

