import axios from 'axios';
import { GET_USER_RECIPES } from '../../actions/types';
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
/**
 * @export
 * @returns {promise} axios promise
 */
export default function () {
  return dispatch => axios.get('/api/users/recipes')
    .then((res) => {
      dispatch(getUserRecipes(res.data.recipes));
    });
}
