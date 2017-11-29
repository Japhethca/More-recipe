import axios from 'axios';
import upload from './handleFileUpload';
import isloading from './isLoading';
import { UPDATE_RECIPE } from '../types';

/**
 * @param {object} data - recipe object
 * @returns {object} action
 */
function updateRecipe(data) {
  return {
    type: UPDATE_RECIPE,
    recipe: data
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
        Materialize.toast('Recipe Successfully Updated!', 4000);
        axios.put(`/api/recipes/${data.id}`, data).then((res) => {
          dispatch(updateRecipe(res.data.updated));
          dispatch(isloading(false));
        }).catch(err => Materialize.toast('Recipe Update Failed!', 4000));
      } else {
        Materialize.toast('Failed to load image!', 4000);
      }
    });
  } else {
    dispatch(isloading(true));
    axios.put(`/api/recipes/${data.id}`, data).then((res) => {
      dispatch(updateRecipe(res.data.updated));
      dispatch(isloading(false));
    }).catch(err => Materialize.toast('Recipe Update Failed!', 4000));
  }
};

