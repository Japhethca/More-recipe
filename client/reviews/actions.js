import axios from 'axios';
import { toastr } from 'react-redux-toastr';

import { ADD_NEW_REVIEW } from '../Recipes/actionTypes';

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

/**
 * @description handles api call for adding reviews
 * @param {Number} id - recipe id
 * @param {Object} data - form content data
 * @returns {Promise} - returns a promise object
 */
export default (id, data) => (dispatch) => {
  axios.post(`/api/recipe/${id}/review`, data)
    .then((response) => {
      dispatch(addNewReview(response.data.review));
      toastr.success(response.data.message);
    }).catch((error) => {
      toastr.error(error.response.data.message);
    });
};

