import axios from 'axios';
import { GET_RECIPE_REVIEW } from '../types';

function getRecipeReview(reviews) {
  return {
    type: GET_RECIPE_REVIEW,
    reviews
  };
}
export default () => dispatch => axios.get('/api/reviews').then((res) => {
  dispatch(getRecipeReview(res.data));
});
