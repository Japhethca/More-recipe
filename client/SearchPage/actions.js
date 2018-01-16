import axios from 'axios';
import { SEARCH_RECIPE_SUCCESS, SEARCH_RECIPE_START, SEARCH_RECIPE_FAILED } from './actionTypes';


/**
 * @description creates a search result action
 * @param {Array} payload
 * @param {Number} currentPage
 * @param {Number} totalPages
 * @returns {Object} - search result action
 */
const searchAction = (payload, currentPage, totalPages) => ({
  type: SEARCH_RECIPE_SUCCESS,
  payload,
});

/**
 * @description dispatched request start
 * @returns {Object} - search result action
 */
const searchActionStart = () => ({
  type: SEARCH_RECIPE_START,
});

/**
 * @description dispatched when request fails
 * @returns {Object} - search result action
 */
const searchActionFailed = () => ({
  type: SEARCH_RECIPE_FAILED,
});


/**
 * @description makes an api call to search for recipe
 * @param {String} query - search query
 * @returns {Promise} - axios promise
 */
export default query => (dispatch) => {
  dispatch(searchActionStart());
  return axios.get(`/api/recipes?search=${query}`).then((response) => {
    dispatch(searchAction(response.data.recipes));
  })
    .catch(() => {
      dispatch(searchActionFailed());
    });
};

