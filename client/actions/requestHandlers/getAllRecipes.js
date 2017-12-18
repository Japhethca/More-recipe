import axios from 'axios';
import { GET_ALL_RECIPES } from '../types';


/**
 * @param {array} recipes
 * @returns {object} of action type
 */
function getRecipes(recipes) {
  return {
    type: GET_ALL_RECIPES,
    recipes
  };
}

/**
 * @export (function)
 * @returns {Object} - returns an axios promise
 */
export default function () {
  return dispatch => axios.get('/api/recipes?limit=6')
    .then((res) => {
      dispatch(getRecipes(res.data.recipes));
    });
}
