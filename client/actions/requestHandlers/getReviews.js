import axios from 'axios';
import { GET_SINGLE_RECIPE_REVIEWS } from '../types';
/**
 * @param {array} reviews
 * @returns {object} action object
 */

const getRecipeReview = reviews => ({
  type: GET_SINGLE_RECIPE_REVIEWS,
  reviews
});

export default id => dispatch => axios.get(`/api/recipe/${id}/reviews`)
  .then((res) => {
    dispatch(getRecipeReview(res.data.reviews));
  });
