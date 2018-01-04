import axios from 'axios';
import { toastr } from 'react-redux-toastr';

import {
  DOWNVOTE_RECIPE,
  UPVOTE_RECIPE,
  ADD_TO_FAVORITES,
  REMOVE_FROM_FAVORITES,
} from '../recipes/actionTypes';


/**
 * @param {object} recipe
 * @returns {object} action
 */
const setUserFavorites = recipe => ({
  type: ADD_TO_FAVORITES,
  recipe
});

/**
 * @export
 * @param {object} recipe
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
 * @param {number} id
 * @returns {object} acion
 */
const removeFromFavorites = id => ({
  type: REMOVE_FROM_FAVORITES,
  id
});

/**
 * @export
 * @param {number} recipeId
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
 * @param {object} recipe
 * @returns {object} sction
 */
const upvote = recipe => ({
  type: UPVOTE_RECIPE,
  recipe
});

export const handleUpvote = id => dispatch => axios.put(`/api/recipe/${id}/upvote`)
  .then(res => dispatch(upvote(res.data.recipe)));
