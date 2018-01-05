import axios from 'axios';
import { toastr } from 'react-redux-toastr';

import {
  DOWNVOTE_RECIPE,
  UPVOTE_RECIPE,
  ADD_TO_FAVORITES,
  REMOVE_FROM_FAVORITES,
} from '../recipes/actionTypes';


/**
 * @description creates an add to favorites action
 * @param {object} recipe - recipe object
 * @returns {object} action
 */
const setUserFavorites = recipe => ({
  type: ADD_TO_FAVORITES,
  recipe
});

/**
 * @description action for adding recipe to favorites
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
 * @description creates an action for removing recipe from favorites
 * @param {number} id - recipe id
 * @returns {object} acion
 */
const removeFromFavorites = id => ({
  type: REMOVE_FROM_FAVORITES,
  id
});

/**
 * @description removes recipe from list of favorites
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
 * @description downvote action creator
 * @param {object} recipe
 * @returns {object} action object
 */
const downvote = recipe => ({
  type: DOWNVOTE_RECIPE,
  recipe
});

/**
 * @description action for downvoting recipe
 * @param {Number} id
 * @returns {Promise} axios promise
 */
export const handleDownvote = id => dispatch => axios.put(`/api/recipe/${id}/downvote`)
  .then((res) => {
    toastr.info(res.data.message);
    dispatch(downvote(res.data.recipe));
  });

  /**
  *@description create an upvote action
 * @param {object} recipe - recipe object
 * @returns {object} action
 */
const upvote = recipe => ({
  type: UPVOTE_RECIPE,
  recipe
});

/**
 * @description handles downvoting recipe
 * @param {Number} id
 * @returns {Promise} axios promise
 */
export const handleUpvote = id => dispatch => axios.put(`/api/recipe/${id}/upvote`)
  .then((res) => {
    toastr.info(res.data.message);
    dispatch(upvote(res.data.recipe));
  });
