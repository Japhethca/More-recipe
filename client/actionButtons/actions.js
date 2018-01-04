import axios from 'axios';
import { toastr } from 'react-redux-toastr';

import {
  DOWNVOTE_RECIPE,
  UPVOTE_RECIPE,
  ADD_TO_FAVORITES,
  REMOVE_FROM_FAVORITES,
} from '../recipes/actionTypes';


/**
 * @param {object} recipe - recipe object
 * @returns {object} action
 */
const setUserFavorites = recipe => ({
  type: ADD_TO_FAVORITES,
  recipe
});

/**
 * @export
 * @param {object} recipe - recipe object
 * @returns {promise} - axios
 */
export const addToFavorites = recipe => dispatch => axios.post(`/api/users/favorites/${recipe.id}`)
  .then((response) => {
    if (response.data.status === 'success') {
      dispatch(setUserFavorites(recipe));
      toastr.success(response.data.message);
    }
  });

/**
 * @param {number} id - recipe id
 * @returns {object} acion
 */
const removeFromFavorites = id => ({
  type: REMOVE_FROM_FAVORITES,
  id
});

/**
 * @export
 * @param {number} recipeId - recipe id
 * @returns {promise} axios promise
 */
export const removeFavorite = recipeId => dispatch => axios.delete(`/api/users/favorites/${recipeId}`)
  .then((response) => {
    if (response.data.status === 'success') {
      dispatch(removeFromFavorites(recipeId));
      toastr.info(response.data.message);
    }
  });

/**
 * @returns downvote action creator
 * @param {object} recipe
 * @returns {object} action object
 */
const downvote = recipe => ({
  type: DOWNVOTE_RECIPE,
  recipe
});

export const handleDownvote = id => dispatch => axios.put(`/api/recipe/${id}/downvote`)
  .then((res) => { dispatch(downvote(res.data.recipe)); });

  /**
  *@description upvote action creator
 * @param {object} recipe - recipe object
 * @returns {object} action
 */
const upvote = recipe => ({
  type: UPVOTE_RECIPE,
  recipe
});
export const handleUpvote = id => dispatch => axios.put(`/api/recipe/${id}/upvote`)
  .then(res => dispatch(upvote(res.data.recipe)));
