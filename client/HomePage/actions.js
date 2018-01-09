import axios from 'axios';

import {
  FETCH_LATEST_RECIPES_SUCCESS,
  FETCH_LATEST_RECIPES_FAILED,
  FETCH_LATEST_RECIPES_START,
} from '../Recipes/actionTypes';


/**
 * @description dispatched on request success
 * @param {array} payload
 * @param {Number} currentPage
 * @param {Number} totalPages
 * @param {Boolean} isFetchingRecipes
 * @returns {object} of action type
 */
const latestRecipesSuccess = (payload, currentPage, totalPages, isFetchingRecipes = false) => ({
  type: FETCH_LATEST_RECIPES_SUCCESS,
  payload,
  currentPage,
  totalPages,
  isFetching: isFetchingRecipes
});

/**
 * @description dispatched on request failure
 * @returns {object} of action type
 */
const latestRecipesFailed = () => ({
  type: FETCH_LATEST_RECIPES_FAILED,
});

/**
 * @description get all recipes action creators
 * @param {array} payload
 * @param {Number} currentPage
 * @param {Number} totalPages
 * @param {Boolean} isFetchingRecipes
 * @returns {object} of action type
 */
const latestRecipesStart = () => ({
  type: FETCH_LATEST_RECIPES_START
});

/**
 * @description handles getting all recipes with page and limit
 * @export
 * @param {object} page
 * @param {object} limit
 * @returns {Object} - returns an axios promise
 */
const getAllRecipes = (page = 1, limit = 12) => (dispatch) => {
  dispatch(latestRecipesStart());
  return axios.get(`/api/recipes?limit=${limit}&page=${page}`)
    .then((response) => {
      const numPages = Math.ceil(response.data.count / limit);
      dispatch(latestRecipesSuccess(response.data.recipes, page, numPages));
    }).catch(() => {
      dispatch(latestRecipesFailed());
    });
};

export default getAllRecipes;
