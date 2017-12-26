import axios from 'axios';
import { toastr } from 'react-redux-toastr';


import upload from './handleFileUpload';
import isloading from './isLoading';
import { UPDATE_RECIPE } from '../types';

/**
 * @param {object} data - recipe object
 * @returns {object} action
 */
function updateRecipe(recipe) {
  return {
    type: UPDATE_RECIPE,
    recipe
  };
}
/**
 * @author chidex
 * @argument {object} data
 * @returns {promise} axios promise
 */
export default data => (dispatch) => {
  if (typeof (data.image) === 'object') {
    dispatch(isloading(true));
    upload(data.image).end((err, res) => {
      if (!err) {
        data.image = res.body.url;

        axios.put(`/api/recipe/${data.id}`, data)
          .then((res) => {
            dispatch(updateRecipe(res.data.recipe));
            toastr.success(res.data.message);
            dispatch(isloading(false));
          })
          .catch(error => toastr.error(error.response.data.message));
      } else {
        toastr.error('failed to load image');
      }
    });
  } else {
    dispatch(isloading(true));
    axios.put(`/api/recipe/${data.id}`, data)
      .then((res) => {
        dispatch(updateRecipe(res.data.recipe));
        dispatch(isloading(false));
        toastr.success(res.data.message);
      })
      .catch(error => toastr.error(error.response.data.message));
  }
};

