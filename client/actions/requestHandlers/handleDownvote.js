import axios from 'axios';
import { DOWNVOTE_RECIPE } from '../types';
/**
 * @param {object} recipe
 * @returns {object} action object
 */
function downvote(recipe) {
  return {
    type: DOWNVOTE_RECIPE,
    recipe
  };
}
export default id => dispatch => axios.put(`/api/recipe/${id}/downvote`)
  .then((res) => { dispatch(downvote(res.data.recipe)); });
