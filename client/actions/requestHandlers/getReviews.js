import axios from 'axios';
import { GET_RECIPE_REVIEW } from '../types';
/**
 * @param {array} reviews
 * @returns {object} action object
 */
function getRecipeReview(reviews) {
  return {
    type: GET_RECIPE_REVIEW,
    reviews
  };
}
export default () => dispatch => axios.get('/api/recipes/reviews')
  .then((res) => {
    dispatch(getRecipeReview(res.data.reviews));
  });
