import axios from 'axios';
// import getAllRecipes from './getAllRecipes';
import { UPVOTE_RECIPE } from '../types';
/**
 * @param {object} recipe
 * @returns {object} sction
 */
function upvote(recipe) {
  return {
    type: UPVOTE_RECIPE,
    recipe
  };
}
export default id => dispatch => axios.put(`/api/recipe/${id}/upvote`)
  .then(res => dispatch(upvote(res.data.recipe)));
