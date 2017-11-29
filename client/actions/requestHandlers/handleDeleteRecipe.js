import axios from 'axios';
import { DELETE_USER_RECIPE } from '../types';


/**
 * @param {number} id
 * @returns {object} action object
 */
function deleteRecipe(id) {
  return {
    type: DELETE_USER_RECIPE,
    id
  };
}
export default id => dispatch => axios.delete(`/api/recipes/${id}`).then((res) => {
  dispatch(deleteRecipe(id));
});

