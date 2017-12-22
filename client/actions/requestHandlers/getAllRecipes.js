import axios from 'axios';
import { GET_ALL_RECIPES, RECIPES_COUNT } from '../types';


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

const getRecipeCount = (count, page) => ({
  type: RECIPES_COUNT,
  count,
  page
});

/**
 * @export (function)
 * @returns {Object} - returns an axios promise
 */
export default function (page = 1) {
  return dispatch => axios.get(`/api/recipes?limit=3&page=${page}`)
    .then((res) => {
      dispatch(getRecipes(res.data.recipes));
      dispatch(getRecipeCount(res.data.count, page));
      dispatch(getRecipeCount(res.data.count, page));
    });
}
