import axios from 'axios';
import { toastr } from 'react-redux-toastr';
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
export default id => dispatch => axios.delete(`/api/recipes/${id}`)
  .then((res) => {
    if (res.data.status === 'success') {
      dispatch(deleteRecipe(id));
      toastr.info(res.data.message);
    }
  }).catch(error => toastr.info(error.response.data.message));

