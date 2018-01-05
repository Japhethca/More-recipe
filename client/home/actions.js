import axios from 'axios';

import { RECIPES_COUNT, GET_ALL_RECIPES, IS_FETCHING } from '../recipes/actionTypes';


/**
 * @description action creator for getting recipe count
 * @param {Number} totalPages
 * @param {Number} curPage
 * @returns {Object} - none
 */
export const getRecipeCount = (totalPages, curPage) => ({
  type: RECIPES_COUNT,
  totalPages,
  curPage
});

/**
 * @description creates isfetching action
 * @param {Boolean} state --http loading state
 * @return {Object} - action
 */
const isFetching = state => ({
  type: IS_FETCHING,
  isFetching: state
});


/**
 * @description get all recipes action creators
 * @param {array} recipes
 * @returns {object} of action type
 */
const getRecipes = recipes => ({
  type: GET_ALL_RECIPES,
  recipes
});

/**
 * @description handles getting all recipes with page and limit
 * @export
 * @param {object} page
 * @param {object} limit
 * @returns {Object} - returns an axios promise
 */
export const getAllRecipes = (page = 1, limit = 8) => (dispatch) => {
  axios.get(`/api/recipes?limit=${limit}&page=${page}`)
    .then((res) => {
      dispatch(isFetching(true));
      dispatch(getRecipes(res.data.recipes));
      const numPages = Math.ceil(res.data.count / limit);
      dispatch(getRecipeCount(numPages, page));
      dispatch(getRecipeCount(numPages, page));
      dispatch(isFetching(false));
    }).catch(() => {
      dispatch(isFetching(false));
    });
};
