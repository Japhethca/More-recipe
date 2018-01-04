import axios from 'axios';

import { GET_USER_FAVORITES, RECIPES_COUNT, GET_ALL_RECIPES, IS_FETCHING } from '../recipes/actionTypes';

/**
 * @param {array} favorites - array of recipes
 * @returns {object} sction
 */
const getUserFavorites = favorites => ({
  type: GET_USER_FAVORITES,
  favorites
});

/**
 * @param {Number} totalPages
 * @param {Number} curPage
 * @returns {Object} - none
 */
const getRecipeCount = (totalPages, curPage) => ({
  type: RECIPES_COUNT,
  totalPages,
  curPage
});

/**
 *
 * @param {Boolean} state --http loading state
 * @return {Object} - action
 */
const isFetching = state => ({
  type: IS_FETCHING,
  isFetching: state
});

/**
 * @export
 * @param {object} userId
 * @returns {promise} axios promise
 */
export const getFavorites = () => dispatch => axios.get('/api/users/favorites')
  .then((res) => {
    const favorites = res.data.favorites.map(favorite => favorite.Recipe);
    dispatch(getUserFavorites(favorites));
  }).catch(error => error);

/**
 * @param {array} recipes
 * @returns {object} of action type
 */
const getRecipes = recipes => ({
  type: GET_ALL_RECIPES,
  recipes
});

/**
 * handles getting all recipes with page and limit
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
