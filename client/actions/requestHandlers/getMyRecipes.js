import axios from 'axios';

import { GET_USER_RECIPES, RECIPES_COUNT } from '../../actions/types';
/**
 * @param {array} userRecipes
 * @returns {Object} action
 */
function getUserRecipes(userRecipes) {
  return {
    type: GET_USER_RECIPES,
    userRecipes
  };
}
const getRecipeCount = (count, page) => ({
  type: RECIPES_COUNT,
  count,
  page
});

/**
 * @export
 * @argument {Number} page
 * @returns {promise} axios promise
 */
export default function (page) {
  return dispatch => axios.get(`/api/users/recipes?limit=2&page=${page}`)
    .then((res) => {
      dispatch(getUserRecipes(res.data.recipes));
      dispatch(getRecipeCount(res.data.count, page));
      dispatch(getRecipeCount(res.data.count, page));
    });
}
