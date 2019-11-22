import axios from 'axios';
import { toastr } from 'react-redux-toastr';

import {
  DOWNVOTE_RECIPE,
  UPVOTE_RECIPE,
} from '../Recipes/actionTypes';


/**
 * @description dispatched on recipe downvote
 * @param {object} recipe
 * @returns {object} action object
 */
export const downvoteAction = recipe => ({
  type: DOWNVOTE_RECIPE,
  recipe
});

/**
 * @description action for downvoting recipe
 * @param {Number} id
 * @returns {Promise} axios promise
 */
export const handleDownvote = id => dispatch =>
  axios.put(`/api/recipe/${id}/downvote`)
    .then((response) => {
      toastr.info(response.data.message);
      dispatch(downvoteAction(response.data.recipe));
    });

/**
  *@description dispatched on recipe upvote
 * @param {object} recipe - recipe object
 * @returns {object} action
 */
export const upvoteAction = recipe => ({
  type: UPVOTE_RECIPE,
  recipe
});

/**
 * @description handles downvoting recipe
 * @param {Number} id
 * @returns {Promise} axios promise
 */
export const handleUpvote = id => dispatch =>
  axios.put(`/api/recipe/${id}/upvote`)
    .then((response) => {
      toastr.info(response.data.message);
      dispatch(upvoteAction(response.data.recipe));
    });
