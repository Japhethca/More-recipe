import axios from 'axios';
import SEARCH_RECIPE from './actionTypes';

const searchAction = results => ({
  type: SEARCH_RECIPE,
  results
});

export default query => dispatch => axios.get(`/api/recipes?search=${query}`).then((response) => {
  dispatch(searchAction(response.data.recipes));
})
  .catch(() => {
    dispatch(searchAction([]));
  });
