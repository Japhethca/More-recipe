import axios from 'axios';
import { toastr } from 'react-redux-toastr';

import { GET_USER_FAVORITES, ADD_TO_FAVORITES, REMOVED_FROM_FAVORITES, RECIPES_COUNT } from '../types';

/**
 * @param {array} favorites
 * @returns {object} sction
 */
function getUserFavorites(favorites) {
  return {
    type: GET_USER_FAVORITES,
    favorites
  };
}
const getRecipeCount = (count, page) => ({
  type: RECIPES_COUNT,
  count,
  page
});


/**
 * @export
 * @param {object} userId
 * @returns {promise} axios promise
 */
export function getFavorites() {
  return dispatch => axios.get('/api/users/favorites')
    .then((res) => {
      const favorites = res.data.favorites.map(favorite => favorite.Recipe);
      dispatch(getUserFavorites(favorites));
      dispatch(getRecipeCount(res.data.count));
    });
}
/**
 * @param {object} recipe
 * @returns {object} action
 */
function setUserFavorites(recipe) {
  return {
    type: ADD_TO_FAVORITES,
    recipe
  };
}
/**
 *
 *
 * @export
 * @param {object} recipe
 * @returns {promise} - axios
 */
export function setFavorites(recipe) {
  return dispatch => axios.post(`/api/users/favorites/${recipe.id}`)
    .then((response) => {
      if (response.data.status === 'success') {
        dispatch(setUserFavorites(recipe));
        toastr.success(response.data.message);
      }
    });
}
/**
 * @param {number} recipeId
 * @returns {object} acion
 */
function removeFromFavorites(recipeId) {
  return {
    type: REMOVED_FROM_FAVORITES,
    recipeId
  };
}
/**
 * @export
 * @param {number} recipeId
 * @returns {promise} axios promise
 */
export function removeFavorite(recipeId) {
  return dispatch => axios.delete(`/api/users/favorites/${recipeId}`)
    .then((response) => {
      if (response.data.status === 'success') {
        dispatch(removeFromFavorites(recipeId));
        toastr.info(response.data.message);
      }
    });
}
