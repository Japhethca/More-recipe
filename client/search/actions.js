import axios from 'axios';
import SEARCH_RECIPE from './actionTypes';

/**
 * @description creates a search result action
 * @param {Array} results
 * @returns {Object} - search result action
 */
const searchAction = results => ({
  type: SEARCH_RECIPE,
  results
});

/**
 * @description makes an api call to search for recipe
 * @param {String} query - search query
 * @returns {Promise} - axios promise
 */
export default query => dispatch => axios.get(`/api/recipes?search=${query}`).then((response) => {
  dispatch(searchAction(response.data.recipes));
})
  .catch(() => {
    dispatch(searchAction([]));
  });
