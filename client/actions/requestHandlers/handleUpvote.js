import axios from 'axios';
// import getAllRecipes from './getAllRecipes';
import { UPVOTE_RECIPE } from '../types';

function upvote(recipe) {
  return {
    type: UPVOTE_RECIPE,
    recipe
  };
}
export default id => dispatch => axios.put(`/api/recipes/${id}/upvotes`).then(res => dispatch(upvote(res.data.Recipe)));
