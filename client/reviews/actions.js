import axios from 'axios';
import { toastr } from 'react-redux-toastr';

import { isFetching } from '../home/actions';
import { ADD_NEW_REVIEW } from './actionTypes';

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
  dispatch(isFetching(true));
  axios.post(`/api/recipe/${id}/review`, data)
    .then((res) => {
      dispatch(isFetching(false, true));
      dispatch(addNewReview(res.data.review));
      toastr.success(res.data.message);
    }).catch((error) => {
      dispatch(isFetching(false));
      toastr.error(error.response.data.message);
    });
};

