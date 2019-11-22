import axios from 'axios';
import { toastr } from 'react-redux-toastr';

import {
  ADD_NEW_REVIEW_SUCCESS,
  ADD_NEW_REVIEW_FAILED } from '../Recipes/actionTypes';


/**
 * @param {object} review
 * @returns {object} - action
 */
export const addNewReviewSuccess = review => ({
  type: ADD_NEW_REVIEW_SUCCESS,
  review
});
/**
 * @param {object} review
 * @returns {object} - action
 */
export const addNewReviewFailed = () => ({
  type: ADD_NEW_REVIEW_FAILED,
});


/**
 * @description handles api call for adding reviews
 * @param {Number} id - recipe id
 * @param {Object} data - form content data
 * @returns {Promise} - returns a promise object
 */
export default (id, data) => dispatch =>
  axios.post(`/api/recipe/${id}/review`, data)
    .then((response) => {
      dispatch(addNewReviewSuccess(response.data.review));
      toastr.success(response.data.message);
    }).catch((error) => {
      dispatch(addNewReviewFailed());
      toastr.error(error.response.data.message);
    });

