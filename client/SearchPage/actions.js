import axios from 'axios';
import SEARCH_RECIPE from './actionTypes';


/**
 * @description creates a search result action
 * @param {Array} payload
 * @param {Number} currentPage
 * @param {Number} totalPages
 * @param {Boolean} isFetching
 * @returns {Object} - search result action
 */
const searchAction = (payload, currentPage, totalPages, isFetching = false) => ({
  type: SEARCH_RECIPE,
  payload,
  currentPage,
  totalPages,
  isFetching
});

/**
 * @description makes an api call to search for recipe
 * @param {String} query - search query
 * @param {Number} page - current page
 * @param {Number} limit - search limit
 * @returns {Promise} - axios promise
 */
export default (query, page = 1, limit = 3) => (dispatch) => {
  dispatch(searchAction([], 0, 0, true));
  axios.get(`/api/recipes?search=${query}`).then((response) => {
    const numPages = Math.ceil(response.data.count / limit);
    dispatch(searchAction(response.data.recipes, page, numPages));
  })
    .catch(() => {
      dispatch(searchAction([]));
    });
};

