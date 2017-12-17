import axios from 'axios';
import { GET_USER_FAVORITES, ADD_TO_FAVORITES, REMOVED_FROM_FAVORITES } from '../types';

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
    })
    .catch((err) => {
      if (err.response.data.status === 'failed') {
        // dispatch(err.response.data.message);
      }
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
    .then((res) => {
      if (res.data.status === 'success') {
        dispatch(setUserFavorites(recipe));
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
    .then((res) => {
      if (res.data.status === 'success') {
        dispatch(removeFromFavorites(recipeId));
      }
    });
}
