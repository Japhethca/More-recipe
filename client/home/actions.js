import axios from 'axios';

import { ALL_RECIPES_COUNT, GET_ALL_RECIPES, IS_FETCHING } from '../recipes/actionTypes';


/**
 * @description action creator for getting recipe count
 * @param {Number} totalPages
 * @param {Number} curPage
 * @returns {Object} - none
 */
export const getAllRecipeCount = (totalPages, curPage) => ({
  type: ALL_RECIPES_COUNT,
  totalPages,
  curPage
});

/**
 * @description creates isfetching action
 * @param {Boolean} state --http loading state
 * @param {Boolean} status --http loading status
 * @param {String} dataType -- type of data being fetched
 * @return {Object} - action
 */
export const isFetching = (state, status = false, dataType = 'recipes') => ({
  type: IS_FETCHING,
  isFetching: state,
  completed: status,
  dataType
});


/**
 * @description get all recipes action creators
 * @param {array} payload
 * @param {Number} currentPage
 * @param {Number} totalPages
 * @param {Boolean} isFetchingRecipes
 * @returns {object} of action type
 */
const getRecipes = (payload, currentPage, totalPages, isFetchingRecipes = false) => ({
  type: GET_ALL_RECIPES,
  payload,
  currentPage,
  totalPages,
  isFetching: isFetchingRecipes
});

/**
 * @description handles getting all recipes with page and limit
 * @export
 * @param {object} page
 * @param {object} limit
 * @returns {Object} - returns an axios promise
 */
export const getAllRecipes = (page = 1, limit = 12) => (dispatch) => {
  dispatch(getRecipes([], 0, 0, true));
  axios.get(`/api/recipes?limit=${limit}&page=${page}`)
    .then((res) => {
      const numPages = Math.ceil(res.data.count / limit);
      dispatch(getRecipes(res.data.recipes, page, numPages));
    }).catch(() => {
      dispatch(getRecipes([], 0, 0));
    });
};
