import axios from 'axios';
import { ADD_NEW_REVIEW } from '../types';

/**
 * @param {object} recipe
 * @returns {object} - action
 */
function addNewReview(recipe) {
  return {
    type: ADD_NEW_REVIEW,
    recipe
  };
}

export default (id, data) => dispatch => axios.post(`/api/recipes/${id}/reviews`, data)
  .then((res) => {
    dispatch(addNewReview(res.data.recipe));
  });

