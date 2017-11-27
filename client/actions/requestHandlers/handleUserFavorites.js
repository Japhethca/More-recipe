import axios from 'axios';
import { GET_USER_FAVORITES, ADD_TO_FAVORITES, REMOVED_FROM_FAVORITES } from '../types';


function getUserFavorites(favorites) {
  return {
    type: GET_USER_FAVORITES,
    favorites
  };
}
export function getFavorites(userId) {
  return dispatch => axios.get(`/api/users/${userId}/recipes`).then((res) => {
    const favorites = res.data.Favorites.map(favorite => favorite.Recipe);
    dispatch(getUserFavorites(favorites));
  }).catch((err) => {});
}

function setUserFavorites(recipe) {
  return {
    type: ADD_TO_FAVORITES,
    recipe
  };
}
export function setFavorites(recipe) {
  return dispatch => axios.post(`/api/users/${recipe.id}/favorites`).then(res => dispatch(setUserFavorites(recipe)));
}

function removeFromFavorites(recipeId) {
  return {
    type: REMOVED_FROM_FAVORITES,
    recipeId
  };
}

export function removeFavorite(recipeId) {
  return dispatch => axios.delete(`/api/users/${recipeId}/favorites`).then(res => dispatch(removeFromFavorites(recipeId)));
}
